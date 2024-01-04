import React, { createContext, useState } from 'react';

const defaultModalContext = {
  modal: { type: '', data: {} },
  handleSetModal: () => {},
};

type ModalValue = {
  modal: { type: string; data: any };
  handleSetModal: (type: string, data: any) => void;
};

export const ModalContext = createContext<ModalValue>(defaultModalContext);

export const ModalProvider = ({ children }: any) => {
  const [modal, setModal] = useState({ type: '', data: {} });

  const handleSetModal = (type: string, data: any) => {
    setModal({ type, data });
  };

  return (
    <ModalContext.Provider value={{ modal, handleSetModal }}>
      {children}
    </ModalContext.Provider>
  );
};
