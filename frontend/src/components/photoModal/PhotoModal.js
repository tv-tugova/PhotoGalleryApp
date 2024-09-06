import React from 'react';

import './photoModal.scss';

const PhotoModal = ({photo, onClose}) => {
    return (
        <div className="modal" onClick={onClose}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:8055/assets/${photo.Image}.jpg`}
              alt='увеличенное фото'
              className="modal__image"
            />
            <span className="modal__close" onClick={onClose}>
              &times;
            </span>
          </div>
        </div>
    );
};

export default PhotoModal;