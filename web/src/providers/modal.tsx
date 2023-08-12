'use client';
import { createContext, useContext } from 'react';
import { BiSolidError } from 'react-icons/bi';
import { DEFAULT_CONTRIBUTION, IContribution, MODAL_ID } from '../common';
import { useModal } from '../hooks';

interface IModalContext {
  payload: Partial<IContribution>;
  openModal: () => void;
  closeModal: () => void;
  resetPayload: () => void;
  handleOnChange: (key: 'type' | 'description', value: string) => void;
}

interface IModalProvider {
  children: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({
  payload: DEFAULT_CONTRIBUTION,
  openModal: () => {},
  closeModal: () => {},
  resetPayload: () => {},
  handleOnChange: (key: 'type' | 'description', value: string) => {},
});

const useModalContext = () => useContext(ModalContext);

const ModalProvider = ({ children }: IModalProvider) => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const modal = useModal();

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const handleOnSubmit = async (): Promise<void> => {};

  const isButtonDisabled = (): boolean =>
    !modal.payload.description ||
    (modal.payload.type === DEFAULT_CONTRIBUTION.type &&
      modal.payload.description === DEFAULT_CONTRIBUTION.description);

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderOptions = (): JSX.Element => {
    if (modal.payload.options && modal.payload.options.length > 0) {
      return (
        <div className="absolute top-10">
          {modal.payload.options.map((option) => option.address)}
        </div>
      );
    }
    return (
      <div
        className="tooltip tooltip-left absolute right-3 top-1/2 text-error"
        data-tip="Invalid address"
      >
        <BiSolidError />
      </div>
    );
  };

  return (
    <ModalContext.Provider value={modal}>
      <dialog id={MODAL_ID} className="modal bg-neutral/75">
        <div className="modal-box">
          <p className="mb-3 text-center text-lg font-semibold md:text-xl">
            Contribute to the community
          </p>
          <div className="my-4 flex flex-col space-y-2">
            <span className="font-semibold">Type</span>
            <select
              onChange={(e) => modal.handleOnChange('type', e.target.value)}
              className="select select-bordered w-full"
            >
              <option>Info</option>
              <option>Alert</option>
              <option>Sighting</option>
            </select>
          </div>
          <div className="my-4 flex flex-col space-y-2">
            <span className="font-semibold">Description</span>
            <textarea
              className="textarea textarea-bordered px-3 placeholder:italic"
              placeholder="Enter your description"
              value={modal.payload.description}
              onChange={(e) =>
                modal.handleOnChange('description', e.target.value)
              }
            />
          </div>
          <div className="relative my-4 flex flex-col space-y-2">
            <span className="font-semibold">Location</span>
            <input
              className="input input-bordered px-3 placeholder:italic"
              placeholder="Search for a location"
              onChange={(e) => modal.handleOnChange('query', e.target.value)}
            />
            {renderOptions()}
          </div>
          <div className="mt-3 flex w-full flex-col-reverse md:flex-row md:space-x-4">
            <button
              className="btn btn-secondary w-full flex-shrink"
              onClick={modal.closeModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary mb-2 w-full flex-shrink md:m-0"
              onClick={handleOnSubmit}
              disabled={isButtonDisabled()}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModalContext };
