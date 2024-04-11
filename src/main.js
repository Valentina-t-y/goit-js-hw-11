import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api';
import { clearGallery, renderImages } from './js/render-functions';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.'
    });
  } finally {
    loader.style.display = 'none';
  }
});