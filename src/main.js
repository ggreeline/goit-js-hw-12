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
const loadMoreBtn = document.querySelector('#load-more');

let lightbox;
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchForm.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery(gallery);
  loadMoreBtn.classList.add('is-hidden');
  showLoader(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found. Try a different search.',
        position: 'topRight',
      });
      return;
    }

    gallery.innerHTML = renderGallery(data.hits);
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery-link');
    } else {
      lightbox.refresh();
    }

    if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader(loader);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader(loader);
  loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await fetchImages(currentQuery, currentPage);

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();

    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader(loader);
  }
});

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
