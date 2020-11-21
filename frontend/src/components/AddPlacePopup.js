import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useForm';

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
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
    onAddPlace({
      name: values.place,
      link: values.link,
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonName={isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <label className="form__item-container">
        <input
          id="place-name-input"
          type="text"
          name="place"
          className="form__item"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          value={values.place || ''}
          onChange={handleChange}
          required
        />
        <span
          id="place-name-input-error"
          className="form__input-error form__input-error_active"
        >
          {errors.place || ''}
        </span>
      </label>
      <label className="form__item-container">
        <input
          id="place-link-input"
          type="url"
          name="link"
          className="form__item"
          placeholder="Ссылка на картинку"
          value={values.link || ''}
          onChange={handleChange}
          required
        />
        <span
          id="place-link-input-error"
          className="form__input-error form__input-error_active"
        >
          {errors.link || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}
