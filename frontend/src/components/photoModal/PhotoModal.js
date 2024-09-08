import React from 'react';

import './photoModal.scss';
import photoStore from '../../stores/PhotoStore';

const PhotoModal = () => {  

    const imgStyle = {'objectFit' : 'cover'};

    return (
        <div className="modal" onClick={() => photoStore.closeModal()}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()} > 
                <img
                    src={`http://localhost:8055/assets/${photoStore.selectedPhoto.Image}.jpg`}
                    alt='selected photo'
                    style={imgStyle}
                    className="modal__image"
                />
                <div className="modal__navigation">
                    <span>
                        {photoStore.currentIndex + 1}/{photoStore.photoList.length}
                    </span>
                    <img 
                        src="/arrow-left.svg" 
                        alt="prev"
                        className="modal__prev"
                        onClick={() => photoStore.setCurrentIndexDown()}
                    />
                    <img 
                        src="/arrow-right.svg" 
                        alt="next"
                        className="modal__next"
                        onClick={() => photoStore.setCurrentIndexUp()}
                    />
                    <img 
                        src="/xmark.svg"
                        alt="close"
                        className="modal__close" 
                        onClick={() => photoStore.closeModal()}  
                    />
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;