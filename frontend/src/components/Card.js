import React, { useContext, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
/** @param {string} trashButtonPath изображение для кнопки корзины */
import trashButtonPath from '../images/button-trash.svg';

function Card({ card, onCardDelete, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((el) => el === currentUser._id);
  /** @param cardRef элемент DOM для плавного удаления */
  const cardRef = useRef();

  const handleDeleteClick = () => {
    onCardDelete(card, cardRef);
  };

  return (
    <li ref={cardRef} className="elements__list-item">
      <img
        className="elements__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={onCardClick.bind(null, card)}
      />
      {/** @description спрятать корзину если пользователь - не владелец карточки */}
      {currentUser._id === card.owner && (
        <img
          className="button button_type_trash"
          src={trashButtonPath}
          alt="Удалить карточку"
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__text">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={`button button_type_like ${isLiked && 'button_liked'}`}
            onClick={onCardLike.bind(null, card)}
          ></button>
          {/** @description спрятать счетчик, если нет лайков */}
          <p
            className={`elements__likes-counter ${
              card.likes.length === 0 && 'elements__likes-counter_hidden'
            }`}
          >
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
