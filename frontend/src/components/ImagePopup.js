import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, ...props }) {
  return (
    <Popup theme="darker" container="image" {...props}>
      <figure className="image-view">
        <img
          className="image-view__image"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <figcaption className="image-view__caption">
          {card && card.name}
        </figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
