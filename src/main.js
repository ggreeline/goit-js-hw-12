import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');

let lightbox;
let currentQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchForm.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery(gallery);
  showLoader(loader);

  fetchImages(currentQuery, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No Results',
          message:
            'Sorry, no images matched your search query. Please try again.',
        });
        return;
      }

      gallery.innerHTML = renderGallery(data.hits);

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery-link');
      } else {
        lightbox.refresh();
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
    })
    .finally(() => {
      hideLoader(loader);
    });
});
