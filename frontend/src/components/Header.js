import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logoPath from '../images/logo.svg';

function Header({ isLoggedIn, isInfoOpened, setInfoOpened, onSignOut }) {
  const handleClick = (evt) => {
    setInfoOpened(!isInfoOpened);
  };

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logoPath} alt="Логотип Russia Mesto" />
        {isLoggedIn ? (
          <div
            className={`hamburger${isInfoOpened ? ' hamburger_opened' : ''}`}
            onClick={handleClick}
          >
            <div className="hamburger__bar"></div>
          </div>
        ) : (
          <Switch>
            <Route path="/signup">
              <Link className="link header__link" to="/signin">
                Войти
              </Link>
            </Route>
            <Route path="*">
              <Link className="link header__link" to="/signup">
                Регистрация
              </Link>
            </Route>
          </Switch>
        )}
      </div>
      {isLoggedIn && (
        <div
          className={`header__info${
            isInfoOpened ? ' header__info_opened' : ''
          }`}
        >
          <p className="header__email">{currentUser.email}</p>
          <Link className="link" onClick={onSignOut} to="#">
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
