import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function getImages(query) {

    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '49142350-3598e22618d74866452dac633',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    const url = `${BASE_URL}?${params}`;

    return axios.get(url)
        .then(response => {
            if (response.data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return null;
            }
            return response.data.hits;
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            iziToast.error({
                message: 'Something went wrong. Please try again later.',
                position: 'topRight',
            });
            throw error;
        });
}