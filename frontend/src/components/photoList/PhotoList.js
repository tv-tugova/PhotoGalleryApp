import React, { useEffect, useState } from 'react';

import PhotoModal from '../photoModal/PhotoModal';
import useDirectus from '../../services/Directus';

import './photoList.scss';

const PhotoList = () => {
    const [photoList, setPhotoList] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [listEnded, setListEnded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const {getAllPhotos} = useDirectus();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    useEffect(() => {
        setSelectedPhoto(photoList[currentIndex])
    }, [currentIndex]);
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        
        getAllPhotos(offset)
            .then(onPhotoListLoaded);
    };

    const onPhotoListLoaded = (newPhotoList) => {
        let ended = false;
        if (newPhotoList.length < 9) {
            ended = true;
        }

        setPhotoList(photoList => [...photoList, ...newPhotoList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setListEnded(listEnded => ended);
    };

    const openModal = (photo, index) => {
        setSelectedPhoto(photo);
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    const photoModal = selectedPhoto ? (
        <PhotoModal
          photo={selectedPhoto}
          onClose={closeModal}
          photoList={photoList}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
    ) : null;

    const imgStyle = {'objectFit' : 'cover'};

    return (
        <div>
            <div className="photo__grid">
                {photoList.map((photo, index) => (
                    <img 
                        className="photo__image"
                        key={photo.id} 
                        src={`http://localhost:8055/assets/${photo.Image}.jpg`} 
                        alt='photo'
                        style={imgStyle}
                        onClick={() => openModal(photo, index)}
                    />
                ))}
                {photoModal}
            </div>
            <button
                className="button"
                disabled={newItemLoading}
                style={{'display': listEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >загрузить ещё</button>
        </div>
    );
};

export default PhotoList;