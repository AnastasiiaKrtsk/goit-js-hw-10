import axios from 'axios';

const api_key =
  'live_WAqhFa2cUYr8btvLIYJUnarLQ9UueQ6g2hHdmh4YpaChshg3xNEU0Hl8MsctHv03';
const url = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios
    .get(url, {
      headers: {
        'x-api-key': api_key,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url, {
    headers: {
      'x-api-key': api_key,
    },
  });
}
