import React from 'react';
import Popup from './Popup';

function PopupWithForm({ name, buttonName, onSubmit, isValid, children, ...props }) {
  return (
    <Popup theme="lighter" container="form" {...props}>
      <form
        action="#"
        className="form"
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button type="submit" className="button button_type_submit" disabled={!isValid}>
          {buttonName}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
