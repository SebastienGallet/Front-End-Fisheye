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
const medias = await getMediaById();

const selectElement = document.querySelector('select');
console.log(selectElement.value)
selectElement.addEventListener('change', () => {
  const selectedOption = selectElement.value;
  sortMedia(medias, selectedOption);


  const section = document.querySelector('.medias');
  section.innerHTML = '';
  displayMedia(medias, photographer);
});

async function displayMedia(medias, photographer) {
  const section = document.querySelector('.medias');
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

  // affichage du nombre total de likes
  let totalLikes = JSON.parse(localStorage.getItem("totalLikes")) || 0;
  const totalLikesElement = document.querySelector('.total-likes');
  totalLikesElement.textContent = `${totalLikes}`;



  /*---------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------
  -------------------------------LIGHTBOX--------------------------------------------
  -----------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------*/
  /**
   * @property {HTMLElement} element
   * @property {string[]} images chemin des images de la lightbox
   */
    class lightbox{
      static init() {
          const links = Array.from(document.querySelectorAll('.mediaChoice'))
          const gallery = links.map(link=> link.getAttribute('src'))


              links.forEach(link => link.addEventListener('click', e =>{
                  e.preventDefault()
                  new lightbox(e.currentTarget.getAttribute('src'), gallery)
              }))
      }

      /**
       * @param {string} url  url de l'image
       * @param {string[]} images  chemin des images de la lightbox
       * @param {string} url image actuellement affichée*/
      constructor(url, images) {
          this.element = this.buildDOM(url)
          this.images= images
          this.loadImage(url)
          this.onKeyUp = this.onKeyUp.bind(this)
          document.body.appendChild(this.element)
          document.addEventListener('keyup', this.onKeyUp)
      }

      /**
       * loader
       * @param{string} url */
      loadImage(url){
        this.url = null
        const image= new Image()
        const container = this.element.querySelector('.lightbox_container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox_loader')
        container.innerHTML = ''
        container.appendChild(loader)
        image.onload =  () => {
          container.removeChild(loader)
          container.appendChild(image)
          this.url = url
        }
        image.src = url
      }

      /**
       * Ferme sur echap
       * @param {MouseEvent} e 
       */
      onKeyUp (e){
        if (e.key === 'Escape') {
          this.close(e)
        } else if (e.key === 'ArrowLeft') {
          this.prev(e)
        } else if (e.key === 'ArrowRight') {
          this.next(e)
        }
      }



      /**
       * Ferme la lightbox
       * @param{MouseEvent/KeyboardEvent} e */
      close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
          this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
      }

      /**
      * navigation
      * @param{MouseEvent/KeyboardEvent} e */
      next (e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        this.loadImage(this.images[i + 1])
        if (i === this.images.length - 1) {
          i = -1
        }
      }

      /**
      * navigation
      * @param{MouseEvent/KeyboardEvent} e */
      prev (e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === 0){
          i = this.images.length -1
        }
        this.loadImage(this.images[i - 1])
      }


      /**
       * @param {string} url 
       * @return {HTMLElement}
      */
      buildDOM(url){
          const dom = document.createElement('div')
          dom.classList.add('lightbox')
          dom.innerHTML = `<button class="lightbox_close"></button>
          <button class="lightbox_next"></button>
          <button class="lightbox_prev"></button>
          <div class="lightbox_container">
          </div>`
          dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
          dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this))
          dom.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this))
          return dom
      }
  }
  lightbox.init()
  /*---------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------
  ------------------------------- FIN LIGHTBOX---------------------------------------
  -----------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------*/

}







// Afficher le total des likes et le prix
let totalLikes = 0;
medias.forEach((media) => {
  totalLikes += media.likes;
});
const section = document.querySelector('.total-likes');
section.innerHTML = `${totalLikes}`;
const priceElement = document.querySelector('.price');
priceElement.innerHTML = `${photographer.price}€ / jour`;


displayProfil(photographer);
displayMedia(medias, photographer);
