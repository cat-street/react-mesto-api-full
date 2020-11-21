import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  /** @param {boolean} isLoading флаг для изменения надписи кнопки */
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    resetForm();
    const { name, about } = currentUser;
    /** @description заполнить поля из контекста */
    setValues({ name, about });
  }, [resetForm, currentUser, setValues, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    onUpdateUser({
      name: values.name,
      about: values.about,
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <label className="form__item-container">
        <input
          id="profile-name-input"
          type="text"
          name="name"
          className="form__item"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span
          id="profile-name-input-error"
          className="form__input-error form__input-error_active"
        >
          {errors.name || ''}
        </span>
      </label>
      <label className="form__item-container">
        <input
          id="profile-about-input"
          type="text"
          name="about"
          className="form__item"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={values.about || ''}
          onChange={handleChange}
        />
        <span
          id="profile-about-input-error"
          className="form__input-error form__input-error_active"
        >
          {errors.about || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}
