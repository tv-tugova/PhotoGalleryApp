import React, {useState} from 'react';

import './photoModal.scss';

const PhotoModal = ({photo, onClose, photoList, currentIndex, setCurrentIndex}) => {  

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === photoList.length - 1 ? 0 : prevIndex + 1
        );
    }; 
    
    const prevPhoto = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? photoList.length - 1 : prevIndex - 1
        );
    };

    const imgStyle = {'objectFit' : 'cover'};

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()} > 
                <img
                    src={`http://localhost:8055/assets/${photo.Image}.jpg`}
                    alt='selected photo'
                    style={imgStyle}
                    className="modal__image"
                />
                <div className="modal__navigation">
                    <span>
                        {currentIndex + 1}/{photoList.length}
                    </span>
                    <img 
                        src="/arrow-left.svg" 
                        alt="prev"
                        className="modal__prev"
                        onClick={prevPhoto} />
                    <img 
                        src="/arrow-right.svg" 
                        alt="next"
                        className="modal__next"
                        onClick={nextPhoto}/>
                    <img 
                        src="/xmark.svg"
                        alt="close"
                        className="modal__close" 
                        onClick={onClose}  
                    />
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;