import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

export function createGallery(images) {
  const imagesMarkup = images
    .map(
      img => `<li class='card'>
                <a class='gallery-link' href='${img.largeImageURL}'>
                    <img src=${img.webformatURL} alt=${img.tags} width='360' />
                </a>
                <div class='desc-wrapper'>
                    <p><span>Likes</span> ${img.likes}</p>
                    <p><span>Views</span> ${img.views}</p>
                    <p><span>Comments</span> ${img.comments}</p>
                    <p><span>Downloads</span> ${img.downloads}</p>
                </div>
            </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imagesMarkup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
