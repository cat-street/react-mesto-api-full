import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
/** @param {string} placeholderPath изображение-заглушка для аватара */
import placeholderPath from '../images/placeholder.svg';
/** @param {object} api готовый объект для работы с API */
/** @param {object} apiPaths фрагменты путей для работы с API */
import api from '../utils/api';
import { apiPaths, tooltipErrorMessages } from '../utils/constants';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [
    isConfirmDeleteCardPopupOpen,
    setConfirmDeleteCardPopupOpen,
  ] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardElement, setCardElement] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    email: '',
    avatar: placeholderPath,
    _id: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /**
   * @param {boolean} regSuccess успешная регистрация, для показа правильного тултипа
   */
  const [regSuccess, setRegSuccess] = useState(false);
  const [newUser, setNewUser] = useState({ password: '', email: '' });
  /**
   * @param {boolean} isInfoOpened состояние скрытого меню в мобильной версии
   */
  const [isInfoOpened, setInfoOpened] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(
    tooltipErrorMessages.FAILURE
  );

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };
  const handleDeleteClick = (card, cardElement) => {
    setConfirmDeleteCardPopupOpen(true);
    setSelectedCard(card);
    setCardElement(cardElement);
  };

  async function handleUpdateUser(userInfo) {
    try {
      await api.setUserInfo(apiPaths.ME, userInfo);
      setCurrentUser((prevUserState) => ({
        ...prevUserState,
        name: userInfo.name,
        about: userInfo.about,
      }));
      closeAllPopups(setEditProfilePopupOpen);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(avatarRef) {
    try {
      await api.uploadAvatar(`${apiPaths.ME}/avatar`, {
        avatar: avatarRef.current.value,
      });
      setCurrentUser((prevUserState) => ({
        ...prevUserState,
        avatar: avatarRef.current.value,
      }));
      closeAllPopups(setEditAvatarPopupOpen);
      avatarRef.current.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(placeInfo) {
    try {
      const newCard = await api.uploadNewPicture(apiPaths.CARDS, {
        name: placeInfo.name,
        link: placeInfo.link,
      });
      setCards((cards) => [newCard, ...cards]);
      closeAllPopups(setAddPlacePopupOpen);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @function closeAllPopups
   * @description поставить состояние "закрыто" для конкретного попапа в
   * зависимости от переданной в аргументе функции
   * @param {function} callback функция изменения состояния
   */
  const closeAllPopups = (callback = null) => {
    setRegSuccess(false);
    if (callback) callback(false);
    /** @description плавное закрытие картинки */
    if (selectedCard !== {}) setTimeout(() => setSelectedCard({}), 300);
  };

  /**
   * @async
   * @function handleCardDelete
   * @description удалить карточку с сервера и обновить стейт
   * @param {object} card
   * @param {object} cardElement DOM-элемент
   */
  async function handleCardDelete(evt) {
    evt.preventDefault();
    const card = selectedCard;
    const cardEl = cardElement;
    try {
      await api.deleteData(`${apiPaths.CARDS}/${card._id}`);
      closeAllPopups(setConfirmDeleteCardPopupOpen);
      cardEl.current.style.opacity = 0;
      /** @description удалить плавно */
      setTimeout(() => setCards(cards.filter((el) => el !== card)), 300);
      setCardElement({});
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @function handleCardLike
   * @description поставить или удалить лайк карточке
   * @param {object} card объект-карточка из массива cards
   */
  const handleCardLike = (card) => {
    /**
     * @const isLiked
     * @description проверить, есть ли лайк пользователя на карточке
     */
    const isLiked = card.likes.some((el) => el === currentUser._id);
    /**
     * @function changeLikeCardStatus
     * @description удалить или поставить лайк, если есть/нет на карточке
     */
    const changeLikeCardStatus = () => {
      if (isLiked) {
        return api.deleteData(`${apiPaths.CARDS}/${card._id}${apiPaths.LIKES}`);
      } else {
        return api.putData(`${apiPaths.CARDS}/${card._id}${apiPaths.LIKES}`);
      }
    };
    /** @description обновить стейт галереи */
    changeLikeCardStatus()
      .then((newCard) => {
        const newCards = cards.map((el) =>
          el._id === card._id ? newCard : el
        );
        setCards(newCards);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * @function setUser
   * @description занести в стейт данные из формы логина/регистрации
   * @param {object} evt
   */
  const setUser = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  /**
   * @function
   * @description установить сообщение инфоокна
   * @param {string} message
   */
  const setTooltip = (message) => {
    setTooltipMessage(message);
  };

  async function handleRegistration(evt, resetForm) {
    evt.preventDefault();
    try {
      const regStatus = await api.auth(apiPaths.SIGNUP, newUser);
      setInfoTooltipOpen(true);
      if (regStatus) {
        resetForm();
        setRegSuccess(true);
        setTooltip(tooltipErrorMessages.SUCCESS);
        setNewUser({ password: '', email: regStatus.email });
        history.push('/signin');
      }
    } catch (error) {
      setTooltip(error.message);
      setInfoTooltipOpen(true);
      console.error(error);
    }
  }

  async function handleSignIn(evt, resetForm) {
    evt.preventDefault();
    try {
      const response = await api.auth(apiPaths.SIGNIN, newUser);
      if (response) {
        resetForm();
        setCurrentUser({
          name: response.name,
          about: response.about,
          avatar: response.avatar,
          email: response.email,
          _id: response._id,
        });
        setNewUser({ password: '', email: '' });
        setTooltip(tooltipErrorMessages.FAILURE);
        setIsLoggedIn(true);
        showMain();
      }
    } catch (error) {
      setTooltip(error.message);
      setInfoTooltipOpen(true);
      console.error(error);
    }
  }

  async function signOut() {
    await api.getData(apiPaths.SIGNOUT);
    setIsLoggedIn(false);
    setCards([]);
    setCurrentUser({
      name: '',
      about: '',
      email: '',
      avatar: placeholderPath,
      _id: null,
    });
    setNewUser((prevUser) => ({ ...prevUser, password: '' }));
    setTooltip(tooltipErrorMessages.FAILURE);
    history.push('/signin');
  };

  const checkCookie = useCallback(async () => {
    try {
      const response = await api.getData(apiPaths.ME);
      setCurrentUser({
        name: response.name,
        about: response.about,
        avatar: response.avatar,
        email: response.email,
        _id: response._id,
      });
      setNewUser((prevUser) => ({ ...prevUser, password: '' }));
      setIsLoggedIn(true);
      showMain();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const showMain = async () => {
    try {
      /** @description запросить галерею с сервера */
      const cardsList = await api.getData(apiPaths.CARDS);
      /**
       * @description записать первоначальную галерею в стейт
       * @param {object} cardsList массив с объектами карточек
       */
      setCards(cardsList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkCookie();
    setInfoOpened(false);
  }, [checkCookie]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups.bind(null, setEditAvatarPopupOpen)}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups.bind(null, setEditProfilePopupOpen)}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups.bind(null, setAddPlacePopupOpen)}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups.bind(null, setConfirmDeleteCardPopupOpen)}
          onConfirmation={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups.bind(null, setImagePopupOpen)}
        />

        <InfoTooltip
          regSuccess={regSuccess}
          message={tooltipMessage}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups.bind(null, setInfoTooltipOpen)}
        />

        <Header
          isLoggedIn={isLoggedIn}
          isInfoOpened={isInfoOpened}
          setInfoOpened={setInfoOpened}
          onSignOut={signOut}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
          />
          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onChange={setUser}
                handleSubmit={handleRegistration}
                user={newUser}
              />
            )}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onChange={setUser}
                handleSubmit={handleSignIn}
                user={newUser}
              />
            )}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
