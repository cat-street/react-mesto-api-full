import React, { useEffect, useCallback } from 'react';

function Popup({ isOpen, onClose, theme, container, title, children }) {
  /**
   * @function closeOnBlack
   * @description Закрывает попап при клике на черной подложке
   * @param {object} evt событие
   */
  const closeOnBlack = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  /**
   * @function handleEscClose
   * @description Закрывает попап при нажатии на Esc
   * @param {object} evt событие
   */
  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [isOpen, handleEscClose]);

  return (
    <div
      className={`popup popup_theme_${theme}${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={closeOnBlack}
    >
      <div className={`popup__container popup__container_type_${container}`}>
        <button
          onClick={onClose}
          type="button"
          className="button button_type_close"
        ></button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
