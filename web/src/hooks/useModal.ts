import { useState } from 'react';
import { DEFAULT_CONTRIBUTION, IContribution, MODAL_ID } from '../common';

export const useModal = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [payload, setPayload] = useState<IContribution>(DEFAULT_CONTRIBUTION);

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const openModal = (): void => {
    const modal = document.getElementById(MODAL_ID) as HTMLFormElement;

    modal.showModal();
  };

  const closeModal = (): void => {
    resetPayload();

    const modal = document.getElementById(MODAL_ID) as HTMLFormElement;
    modal.close();
  };

  const handleOnChange = (key: 'type' | 'description', value: string): void => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const resetPayload = (): void => setPayload(DEFAULT_CONTRIBUTION);

  return { payload, openModal, closeModal, resetPayload, handleOnChange };
};
