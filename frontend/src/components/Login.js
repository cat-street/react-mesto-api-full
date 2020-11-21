import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {
  return <AuthForm type="Вход" buttonName="Войти" {...props} />;
}

export default Login;
