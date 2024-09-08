import { makeAutoObservable } from "mobx";

class PhotoStore {
    photoList = [];
    selectedPhoto = null;
    newItemLoading = false;
    offset = 0;
    listEnded = false;
    currentIndex = 0;

    constructor() {
        makeAutoObservable(this);
    }

    loadPhotos(getAllPhotos, initial = false) {
        this.setNewItemLoading(!initial); 
        getAllPhotos(this.offset)
            .then((newPhotoList) => this.onPhotoListLoaded(newPhotoList))
            .catch((error) => {
                console.error('Ошибка при загрузке фотографий:', error);
                this.setNewItemLoading(false);
            });
    }

    onPhotoListLoaded(newPhotoList) {
        const ended = newPhotoList.length < 9;
        this.photoList = [...this.photoList, ...newPhotoList];
        this.newItemLoading = false;
        this.offset += 9;
        this.listEnded = ended;
    }

    setSelectedPhoto(photo) {
        this.selectedPhoto = photo;
    }
    
    setCurrentIndex(index) {
        this.currentIndex = index;
        this.selectedPhoto = this.photoList[index];
    }

    setCurrentIndexUp() { 
        this.currentIndex += 1;
        this.selectedPhoto = this.photoList[this.currentIndex];
    }

    setCurrentIndexDown() { 
        this.currentIndex -= 1;
        this.selectedPhoto = this.photoList[this.currentIndex];
    }

    setNewItemLoading(value) {
        this.newItemLoading = value;
    }
    
    closeModal() {
        this.selectedPhoto = null;
    }
}

const photoStore = new PhotoStore();
export default photoStore;