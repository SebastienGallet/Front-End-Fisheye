import { getPhotographersById } from "../api.js";
import { getMediaById } from "../api.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";
import { sortMedia } from "../utils/filterMedia.js";

async function displayProfil(photographer) {
  const section = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographerHeader = photographerModel.getOnePhotographerDOM();
  section.insertAdjacentHTML('beforeend', `<div class="headerblock">${photographerHeader}</div>`);
}

async function displayMedia(media, photographer){
  const section = document.querySelector('.medias')
  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const photographerMedia = mediaModel.getMediaDOM();
    section.insertAdjacentHTML('beforeend', `<div class="card">${photographerMedia}</div>`);
  });
}


const photographer = await getPhotographersById();
const medias = await getMediaById();


const selectElement = document.querySelector('#select');
selectElement.addEventListener('change', () => {
  const selectedOption = selectElement.value;
  sortMedia(medias, selectedOption);


  const section = document.querySelector('.medias');
  section.innerHTML = '';
  displayMedia(medias, photographer);
});


displayProfil(photographer);
displayMedia(medias, photographer); 



// let fullName = photographer.name
//   let nameParts = fullName.split(' ');
//   let firstName = nameParts[0];
//   console.log(firstName)