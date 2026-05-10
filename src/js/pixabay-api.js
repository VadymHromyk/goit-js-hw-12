import axios from 'axios';

const pixabayURL = 'https://pixabay.com/api/';
const myKey = '55691609-a8828a4d73b13042c91b577cc';

export async function getImagesByQuery(query, page) {
  const params = {
    key: myKey,
    q: query,
    page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const response = await axios.get(pixabayURL, { params });

  return response.data;
}
