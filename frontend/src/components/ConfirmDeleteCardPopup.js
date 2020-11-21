import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeleteCardPopup({ isOpen, onClose, onConfirmation }) {

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonName="Да"
      isOpen={isOpen}
      isValid={true}
      onClose={onClose}
      onSubmit={onConfirmation}
    >
    </PopupWithForm>
  );

}
