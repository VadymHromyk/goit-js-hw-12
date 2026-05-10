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
  ScrollGallery,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const hitsPerPage = 15;

hideLoader();

form.addEventListener('submit', e => {
  e.preventDefault();

  query = form.elements.search.value;
  page = 1;

  form.reset();
  clearGallery();
  showLoader();
  hideLoadMoreButton();

  if (query.trim()) {
    getImagesByQuery(query, page)
      .then(data => {
        if (data.hits.length > 0) {
          if (page >= Math.ceil(data.totalHits / hitsPerPage)) {
            hideLoadMoreButton();
            iziToast.info({
              message: `We're sorry, but you've reached the end of search results.`,
              position: 'topRight',
            });
          } else {
            showLoadMoreButton();
          }

          createGallery(data.hits);
        } else
          iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
      })
      .catch(error => {
        iziToast.error({
          message: error.message,
          position: 'topRight',
        });
      })
      .finally(hideLoader);
  }
});

loadMoreBtn.addEventListener('click', e => {
  page += 1;

  showLoader();
  hideLoadMoreButton();

  getImagesByQuery(query, page)
    .then(data => {
      if (data.hits.length > 0) {
        if (page >= Math.ceil(data.totalHits / hitsPerPage)) {
          hideLoadMoreButton();
          iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight',
          });
        } else {
          showLoadMoreButton();
        }

        createGallery(data.hits);
        ScrollGallery();
      } else
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        position: 'topRight',
      });
    })
    .finally(hideLoader);
});
