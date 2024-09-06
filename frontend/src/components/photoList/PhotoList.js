import React, { useEffect, useState } from 'react';

import Directus from '../../services/directus';

import './photoList.scss';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    
    const directus = new Directus();

    useEffect(() => {
        const fetchPhotos = async () => {
        const data = await directus.getAllPhotos();
        setPhotos(data.data);
    };

    fetchPhotos();
    }, []);

    return (
        <div className="photo-list">
            {photos.map((photo) => (
                <img 
                    key={photo.id} 
                    src={`${directus.apiBase}/assets/${photo.Image}.jpg`} 
                    alt='фото'
                />
            ))}
        </div>
    );
};

export default PhotoList;