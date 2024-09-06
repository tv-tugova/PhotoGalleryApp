import React, { useEffect, useState } from 'react';

import Directus from '../../services/directus';
import PhotoModal from '../photoModal/PhotoModal';

import './photoList.scss';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    
    const directus = new Directus();

    useEffect(() => {
        const fetchPhotos = async () => {
        const data = await directus.getAllPhotos();
        setPhotos(data.data);
    };

    fetchPhotos();
    }, []);

    const openModal = (photo) => {
        setSelectedPhoto(photo);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    const photoModal = selectedPhoto ? (
        <PhotoModal
          photo={selectedPhoto}
          onClose={closeModal}
        />
    ) : null;

    const imgStyle = {'objectFit' : 'cover'};

    return (
        <div className="photo__grid">
            {photos.map((photo) => (
                <img 
                    className="photo__image"
                    key={photo.id} 
                    src={`${directus.apiBase}/assets/${photo.Image}.jpg`} 
                    alt='фото'
                    style={imgStyle}
                    onClick={() => openModal(photo)}
                />
            ))}
            {photoModal}
        </div>
    );
};

export default PhotoList;