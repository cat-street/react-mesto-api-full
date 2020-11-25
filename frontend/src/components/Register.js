import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';


function Register(props) {
  return (
    <AuthForm
      type="Регистрация"
      buttonName="Зарегистрироваться"
      {...props}
    >
      <p className="auth-container__info">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="link">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
