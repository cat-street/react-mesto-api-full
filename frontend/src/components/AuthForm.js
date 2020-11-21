import React, { useEffect } from 'react';
import useFormWithValidation from '../hooks/useForm';

function AuthForm({ type, buttonName, onChange, handleSubmit, user, children }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  const handleFormChange = (evt) => {
    handleChange(evt);
    onChange(evt);
  }

  const onSubmit = (evt) => {
    handleSubmit(evt, resetForm);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="auth-container">
      <h2 className="form__header">{type}</h2>
      <form className="form" onSubmit={onSubmit} noValidate>
        <label className="form__item-container">
          <input
            type="email"
            name="email"
            className="form__item form__item_theme_dark"
            placeholder="Email"
            onChange={handleFormChange}
            value={values.email || user.email || ''}
            required
          />
          <span className="form__input-error form__input-error_active">
            {errors.email || ''}
          </span>
        </label>
        <label className="form__item-container">
          <input
            type="password"
            name="password"
            className="form__item form__item_theme_dark"
            placeholder="Пароль"
            onChange={handleFormChange}
            value={values.password || ''}
            required
          />
          <span className="form__input-error form__input-error_active">
            {errors.password || ''}
          </span>
        </label>
        <button
          type="submit"
          className="button button_type_submit button_theme_dark button_type_auth-form"
          disabled={!isValid}
        >
          {buttonName}
        </button>
      </form>
      {children}
    </section>
  );
}

export default AuthForm;
