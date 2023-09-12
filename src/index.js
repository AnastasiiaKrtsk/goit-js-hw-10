// index.js
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.js-breed-select');
const loader = document.querySelector('.loader');
const load = document.querySelector('.load');
const errorEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const option = document.querySelector('.js-breed-select option');

breedSelect.addEventListener('change', () => {
  hideOption();
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(response => {
        const catData = response.data[0];
        displayCatInfo(catData);
      })
      .catch(error => {
        console.error('Error fetching cat data:', error);
      });
  }
});

function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <h2>${catData.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
    <img src="${catData.url}" alt="${catData.breeds[0].name}" width=500 />
  `;
}
// Функція для заповнення селекту опціями
function fillBreedSelect(breeds) {
  breeds.forEach((breed, index) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function hideOption() {
  option.style.display = 'none';
}
// Функція для відображення завантажувача
function showLoader() {
  breedSelect.style.display = 'none';
  errorEl.style.display = 'none';
  loader.style.display = 'block';
  load.style.display = 'inline-block';
  catInfo.style.display = 'none';
}

// Функція для приховання завантажувача
function hideLoader() {
  breedSelect.style.display = 'block';
  errorEl.style.display = 'none';
  loader.style.display = 'none';
  load.style.display = 'none';
  catInfo.style.display = 'block';
}

// Викликаємо fetchBreeds та обробляємо результат
showLoader(); // Відображаємо завантажувач при запуску
fetchBreeds()
  .then(breeds => {
    fillBreedSelect(breeds);
    hideLoader();
  })
  .catch(error => {
    // При обробці помилки показуємо відповідне повідомлення
    hideLoader();
    showError();
    console.error(error);
  });

// import SlimSelect from 'slim-select';
// const slimSelect = new SlimSelect({
//   select: '.js-breed-select',
//   settings: {
//     disabled: true,
//     contentLocation: document.getElementById('local'),
//     allowDeselect: true,
//   },
// });
// slimSelect();

// import Notiflix from 'notiflix';
// function showError() {
//   loader.style.display = 'none';
//   load.style.display = 'none';
//   breedSelect.style.display = 'none';

//   Notiflix.Report.Failure(
//     'Error',
//     'Oops! Something went wrong! Try reloading the page!',
//     'Reload',
//     () => {
//       location.reload();
//     }
//   );
// }
