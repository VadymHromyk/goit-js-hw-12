import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const hitsPerPage = 15;

hideLoader();

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = form.elements.search.value;
  page = 1;

  form.reset();
  clearGallery();
  hideLoadMoreButton();

  if (!query.trim()) return;

  try {
    showLoader();

    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / hitsPerPage);

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async e => {
  page += 1;

  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);
    ScrollGallery();

    const totalPages = Math.ceil(data.totalHits / hitsPerPage);

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function ScrollGallery() {
  const cardSize = document.querySelector('.card').getBoundingClientRect();
  scrollBy({ top: cardSize.height * 2, behavior: 'smooth' });
}
