import { useState } from 'react';
import toast from 'react-hot-toast';
import { DEFAULT_PAYLOAD, IModalState, MODAL_ID, Utils } from '../common';
import { ContributionService, OneMapService } from '../services';

export const useModal = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [payload, setPayload] = useState<IModalState>(DEFAULT_PAYLOAD);

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const debounce = (callback: Function, delay: number) => {
    let timerId: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const openModal = (): void => {
    const modal = document.getElementById(MODAL_ID) as HTMLFormElement;

    modal.showModal();
  };

  const closeModal = (): void => {
    resetPayload();

    const modal = document.getElementById(MODAL_ID) as HTMLFormElement;
    modal.close();
  };

  const searchAddress = async (address: string): Promise<void> => {
    if (!address) return;

    const addresses = await OneMapService.searchAddress(address);

    setPayload({
      ...payload,
      options: addresses,
    });
  };

  const handleDebouncedSearch = debounce(searchAddress, 1500);

  const handleOnChange = (
    key: 'type' | 'description' | 'query' | 'location' | 'options',
    value: string | object,
    ignoreDebounce = false,
  ): void => {
    if (key === 'query' && !ignoreDebounce) {
      handleDebouncedSearch(value);
    } else {
      setPayload({
        ...payload,
        [key]: value,
      });
    }
  };

  const resetPayload = (): void => {
    setPayload(DEFAULT_PAYLOAD);
    const locationInput = document.getElementById(
      'location',
    ) as HTMLInputElement;

    locationInput.value = '';
  };

  const handleOnSubmit = async (): Promise<void> => {
    try {
      await toast.promise(
        ContributionService.create({
          type: payload.type,
          location: payload.location,
          description: payload.description,
        }),
        {
          loading: 'Attempting to contribute',
          success: 'Successfully contributed',
          error: (e) => Utils.capitalize(e.response.data.message.toString()),
        },
      );
    } finally {
      closeModal();
    }
  };

  return {
    payload,
    openModal,
    closeModal,
    resetPayload,
    handleOnChange,
    handleOnSubmit,
    handleClose: closeModal,
  };
};
