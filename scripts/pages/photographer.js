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
const sortlist = document.querySelector(".sort-list")
selectElement.addEventListener('click', () => {
  selectElement.style.display = "none"
  sortlist.style.display = "flex"
})
selectElement.addEventListener('change', () => {
  const selectedOption = selectElement.value;
  sortMedia(medias, selectedOption);


  const section = document.querySelector('.medias');
  section.innerHTML = '';
  displayMedia(medias, photographer);
});


let sortEntries = document.querySelectorAll('.sort-entry');
sortEntries.forEach(entry => {
    entry.addEventListener('click', function(event) {
        selectElement.style.display = "flex"
        sortlist.style.display = "none"
        let selectedId = event.target.dataset.id;
        let select = document.querySelector('select');
        switch (selectedId) {
            case "Popularité":
                select.options.selectedIndex = 1; // Popularité is the second option
                break;
            case "Date":
                select.options.selectedIndex = 0; // Date is the first option
                break;
            case "Titre":
                select.options.selectedIndex = 2; // Titre is the third option
                break;
        }
        sortMedia(medias, select.value);
        const section = document.querySelector('.medias');
        section.innerHTML = '';
        displayMedia(medias, photographer);
    });
});



async function displayMedia(medias) {
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
      
      // stockage dans le ls
      if (liked) {
        localStorage.setItem(`liked-${media.id}`, JSON.stringify(liked));
      } else { 
        localStorage.removeItem(`liked-${media.id}`);
      }
      localStorage.setItem(`likes-${media.id}`, likes);
    });
  });
   /*---------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------
  -------------------------------LIGHTBOX--------------------------------------------
  -----------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------*/
  class lightbox {
    static init() {
      const links = Array.from(document.querySelectorAll('.mediaChoice'))
      const gallery = links.map(link => link.getAttribute('src'))
  
      links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        new lightbox(e.currentTarget, gallery)
      }))
    }
  
    constructor(mediaElement, images) {
      this.mediaElement = mediaElement
      this.images = images
      this.currentIndex = images.findIndex(image => image === mediaElement.getAttribute('src'))
      this.url = images[this.currentIndex]
      this.element = this.buildDOM()
      this.loadMedia()
      this.onKeyUp = this.onKeyUp.bind(this)
      document.body.appendChild(this.element)
      document.addEventListener('keyup', this.onKeyUp)
    }
  
    loadMedia() {
      const container = this.element.querySelector('.lightbox_container')
      const loader = document.createElement('div')
      loader.classList.add('lightbox_loader')
      container.innerHTML = ''
      container.appendChild(loader)
    
      // Determiner le type de media
      let mediaType = this.mediaElement.getAttribute("data-media-type")
    
      if (mediaType === "image" && mediaType!=null) {
        const image = new Image()
        image.onload = () => {
          container.removeChild(loader)
          container.appendChild(image)
        }
        image.src = this.images[this.currentIndex]
      } else if (mediaType === "video" && mediaType!=null) {
        const video = document.createElement('video')
        video.src = this.images[this.currentIndex]
        video.controls = true
        video.onloadeddata = () => {
          container.removeChild(loader)
          container.appendChild(video)
        }
      }
      else{
        //if unknown media type
        container.removeChild(loader);
        container.innerHTML = "Type de media non reconnu"
      }
    }
    
  
    buildDOM() {
      return `
      <div class="lightbox_overlay fadeIn">
        <div class="lightbox_container">
        </div>
        <i class="fa-solid fa-times icon close" id="close"></i>
        <i class="fa-solid fa-arrow-left icon prev" id="prev"></i>
        <i class="fa-solid fa-arrow-right icon next" id="next"></i>
      </div>
      `
    }
    
    onKeyUp(e) {
      if (e.key === 'Escape') {
        this.close(e)
      } else if (e.key === 'ArrowLeft') {
        this.prev(e)
      } else if (e.key === 'ArrowRight') {
        this.next(e)
      }
    }
    
    close(e) {
      e.preventDefault()
      this.element.classList.add('fadeOut')
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
      }, 500)
      document.removeEventListener('keyup', this.onKeyUp)
    }
    
    prev(e) {
      e.preventDefault();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.url = this.images[this.currentIndex];
      this.mediaElement = document.querySelector(`img[src="${this.url}"], video[src="${this.url}"]`);
      this.loadMedia();
    }
  
    next(e) {
      e.preventDefault();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.url = this.images[this.currentIndex];
      this.mediaElement = document.querySelector(`img[src="${this.url}"], video[src="${this.url}"]`);
      this.loadMedia();
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




function updateTotalLikes() {
  let totalLikes = 0;
  medias.forEach((media) => {
    totalLikes += media.likes;
  });
  const totalLikesElement = document.querySelector('.total-likes');
  totalLikesElement.textContent = `${totalLikes}`;
  const priceElement = document.querySelector('.price');
  priceElement.innerHTML = `${photographer.price}€ / jour`;
}

// charger les données du ls
let totalLikes = JSON.parse(localStorage.getItem("totalLikes")) || 0;

// Mettre à jour les données des médias avec les données de likes chargées
medias.forEach((media) => {
  media.likes = JSON.parse(localStorage.getItem(`likes-${media.id}`)) || media.likes;
  totalLikes += media.likes;
});

localStorage.setItem("totalLikes", totalLikes);

//MAJ du total au chargement de la page
updateTotalLikes();


displayProfil(photographer);
displayMedia(medias, photographer);
