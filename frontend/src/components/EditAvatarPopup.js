import React, { useRef, useEffect, useState } from 'react';
import useFormWithValidation from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    onUpdateAvatar(avatarRef).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__item-container">
        <input
          ref={avatarRef}
          id="avatar-link-input"
          type="url"
          name="link"
          className="form__item"
          placeholder="Ссылка на аватар"
          onChange={handleChange}
          value={values.link || ''}
          required
        />
        <span
          id="avatar-link-input-error"
          className="form__input-error form__input-error_active"
        >
          {errors.link || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}
