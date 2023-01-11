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

const photographer = await getPhotographersById();
let medias = await getMediaById();

const selectElement = document.querySelector('#select');
selectElement.addEventListener('change', () => {
  const selectedOption = selectElement.value;
  sortMedia(medias, selectedOption);


  const section = document.querySelector('.medias');
  section.innerHTML = '';
  displayMedia(medias, photographer);
});

async function displayMedia(medias, photographer) {
    // Supprimer les médias existants de l'écran avant de les afficher à nouveau triés
    const section = document.querySelector('.medias');
    section.innerHTML = "";

    medias.forEach((media) => {
      const mediaModel = mediaFactory(media);
      const photographerMedia = mediaModel.getMediaDOM();
      section.insertAdjacentHTML('beforeend', `<div class="card">${photographerMedia}</div>`);

      // Récupération le coeur en utilisant l'id unique de la photo
      const heart = document.querySelector(`#heart-${media.id}`);
      const likesElement = document.querySelector(`#likes-${media.id}`);

      // Récupération de l'état actuel du coeur et du like à partir de localStorage
      let liked = JSON.parse(localStorage.getItem(`liked-${media.id}`)) || false;
      let likes = JSON.parse(localStorage.getItem(`likes-${media.id}`)) || media.likes;

      // Mise à jour de l'affichage en fonction de l'état actuel
      if (liked) {
        heart.style.color = "red";
        likesElement.style['font-size'] = "24px";
        likesElement.style.color = "#901C1C";
      } else {
        heart.style.color = "grey";
        likesElement.style['font-size'] = "16px";
        likesElement.style.color = "black";
      }

      likesElement.textContent = `${likes}`;

      // Ajoutez un événement click sur le coeur
      heart.addEventListener('click', () => {
        if (!liked) {
          likes += 1;
          liked = true;
          heart.style.color = "red";
          likesElement.style['font-size'] = "24px";
          likesElement.style.color = "#901C1C";
        } else {
          likes -= 1;
          liked = false;
          heart.style.color = "grey";
          likesElement.style['font-size'] = "16px";
          likesElement.style.color = "black";
        }

        //maj de l'affichage
        likesElement.textContent = `${likes}`;
        media.likes = likes;

        //maj du total
        let totalLikes = 0;
        medias.forEach((media) => {
          totalLikes += media.likes;
        });
        const totalLikesElement = document.querySelector('.total-likes');
        totalLikesElement.textContent = `${totalLikes}`;
        localStorage.setItem("totalLikes", totalLikes);

        // Enregistrez l'état actuel du coeur et du like dans localStorage
        if (liked) {
          localStorage.setItem(`liked-${media.id}`, JSON.stringify(liked));
        } else { 
          localStorage.removeItem(`liked-${media.id}`);
        }
        localStorage.setItem(`likes-${media.id}`, likes);
      });
    });
  }

displayProfil(photographer);
displayMedia(medias, photographer);






// let fullName = photographer.name
//   let nameParts = fullName.split(' ');
//   let firstName = nameParts[0];
//   console.log(firstName)