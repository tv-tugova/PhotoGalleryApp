import { useHttp } from "../hooks/http.hook";

const useDirectus = () => {
    const {loading, request} = useHttp();
  
    const apiBase = 'http://localhost:8055';
    const baseOffset = 0;

    const getAllPhotos = async (offset = baseOffset) => {
        const res = await request(`${apiBase}/items/photos?limit=9&offset=${offset}`);
        return res.data;
    };

    const getPhoto = (id) => {
        return request(`${apiBase}/items/photos/${id}`)
    }

    return {loading, getAllPhotos, getPhoto};
};

export default useDirectus;
