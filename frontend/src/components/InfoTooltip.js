import React from 'react';
import Popup from './Popup';

function InfoTooltip({ regSuccess, message, ...props }) {
  return (
    <Popup theme="lighter" container="tooltip" {...props}>
      <div
        className={`popup__reg-status popup__reg-status_type_${
          regSuccess ? 'success' : 'failure'
        }`}
      />
      <h2 className="popup__title popup__title_type_register">
        {message}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
