import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import photoStore from '../../stores/PhotoStore';

import PhotoModal from '../photoModal/PhotoModal';
import useDirectus from '../../services/directus';

import './photoList.scss';

const PhotoList = () => {
    const { getAllPhotos } = useDirectus();

    useEffect(() => {
        photoStore.loadPhotos(getAllPhotos);
    }, []);

    const openModal = (photo, index) => {
        photoStore.setSelectedPhoto(photo);
        photoStore.setCurrentIndex(index);
    };
    
    const imgStyle = {'objectFit' : 'cover'};

    return (
        <div>
            <div className="photo__grid">
                {photoStore.photoList.map((photo, index) => (
                    <img 
                        className="photo__image"
                        key={photo.id} 
                        src={`http://localhost:8055/assets/${photo.Image}.jpg`} 
                        alt='photo'
                        style={imgStyle}
                        onClick={() => openModal(photo, index)}
                    />
                ))}
                {photoStore.selectedPhoto ? (
                    <PhotoModal/>
                ) : null}
            </div>
            {!photoStore.listEnded && (
                <button
                    className="button"
                    disabled={photoStore.newItemLoading}
                    onClick={() => photoStore.loadPhotos(getAllPhotos, true)}
                >
                    загрузить ещё
                </button>
            )}
        </div>
    );
};

export default observer(PhotoList);