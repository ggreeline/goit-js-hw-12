import axios from 'axios';
const API_KEY = '48468658-42ed6d7129c3b4c82c2d48fe1';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
