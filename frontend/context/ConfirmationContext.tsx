import { useState, createContext } from 'react';

interface Modal {
  message: string;
  action: () => void;
}

interface ConfirmationContextIF {
  confirmation: Modal;
  showConfirmationModal: (modal: Modal) => void;
  closeConfirmationModal: () => void;
}

export const ConfirmationContext = createContext<ConfirmationContextIF>();

const ConfirmationProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmation, setConfirmation] = useState<Modal | null>(null);

  const showConfirmationModal = (modal: Modal) => {
    setConfirmation({
      ...modal
    });
  };

  const closeConfirmationModal = () => {
    setConfirmation(null);
  };

  return (
    <ConfirmationContext.Provider
      value={{confirmation, showConfirmationModal, closeConfirmationModal}}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationProvider;