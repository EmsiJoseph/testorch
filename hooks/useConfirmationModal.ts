import { useState } from "react";

export const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const openModal = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    onConfirm,
    openModal,
    closeModal,
  };
};
