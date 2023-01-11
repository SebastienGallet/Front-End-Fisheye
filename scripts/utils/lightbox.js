// // Création de la lightbox
// const createLightbox = () => {
//     const lightbox = document.querySelector('.lightbox')
//     lightbox.innerHTML = `
//       <i class="fa-solid fa-times icon close-icon"></i>
//       <i class="fa-solid fa-arrow-left icon prev-icon"></i>
//       <i class="fa-solid fa-arrow-right icon next-icon"></i>
//       <div class="lightbox-content"></div>
//     `;
  
//     // Ajout de la lightbox au DOM
//     document.body.appendChild(lightbox);
//   }
  
//   // Affichage de la lightbox
//   const showLightbox = () => {
//     const lightbox = document.querySelector('.lightbox');
//     lightbox.classList.add('visible');
//   }
  
//   // Masquage de la lightbox
//   const hideLightbox = () => {
//     const lightbox = document.querySelector('.lightbox');
//     lightbox.classList.remove('visible');
//   }
  
//   // Gestion de la navigation avec les flèches
//   const handleNavigation = () => {
//     const prevIcon = document.querySelector('.prev-icon');
//     const nextIcon = document.querySelector('.next-icon');
  
//     prevIcon.addEventListener('click', () => {
//       // code de navigation vers l'élément précédent
//     });
  
//     nextIcon.addEventListener('click', () => {
//       // code de navigation vers l'élément suivant
//     });
//   }
  
//   // Gestion du clic sur la croix de fermeture
//   const handleClose = () => {
//     const closeIcon = document.querySelector('.close-icon');
//     closeIcon.addEventListener('click', hideLightbox);
//   }
  
//   // Initialisation de la lightbox
//   const initLightbox = () => {
//     createLightbox();
//     handleNavigation();
//     handleClose();
//   }
  
//   initLightbox();




//-------------------------------------------------------------------------------------------------------------------------------------



// // Création de la lightbox
// const createLightbox = () => {
//     const lightbox = document.querySelector('.lightbox')
//     lightbox.innerHTML = `
//       <i class="fa-solid fa-times icon close-icon"></i>
//       <i class="fa-solid fa-arrow-left icon prev-icon"></i>
//       <i class="fa-solid fa-arrow-right icon next-icon"></i>
//       <div class="lightbox-content"></div>
//     `;
  
//     // Ajout de la lightbox au DOM
//     document.body.appendChild(lightbox);
//   }
  
//   // Affichage de la lightbox
//   const showLightbox = () => {
//     const lightbox = document.querySelector('.lightbox');
//     lightbox.classList.add('visible');
//     updateLightboxContent();
//   }
  
//   // Masquage de la lightbox
//   const hideLightbox = () => {
//     const lightbox = document.querySelector('.lightbox');
//     lightbox.classList.remove('visible');
//   }
  
//   // Navigation vers l'élément précédent
//   const navigatePrev = () => {
//     currentIndex = Math.max(currentIndex - 1, 0);
//     updateLightboxContent();
//   }
  
//   // Navigation vers l'élément suivant
//   const navigateNext = () => {
//     currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//     updateLightboxContent();
//   }
  
//   // Mise à jour du contenu de la lightbox
//   const updateLightboxContent = () => {
//     const element = elements[currentIndex];
//     const lightboxContent = document.querySelector('.lightbox-content');
//     lightboxContent.innerHTML = element.getMediaDOM();
//   }
  
//   // Gestion de la navigation avec les flèches
//   const handleNavigation = () => {
//     const prevIcon = document.querySelector('.prev-icon');
//     const nextIcon = document.querySelector('.next-icon');
  
//     prevIcon.addEventListener('click', navigatePrev);
//     nextIcon.addEventListener('click', navigateNext);
//   }
  
//   // Gestion du clic sur la croix de fermeture
//   const handleClose = () => {
//     const closeIcon = document.querySelector('.close-icon');
//     closeIcon.addEventListener('click', hideLightbox);
//   }
  
//   // Initialisation de la lightbox
//   const initLightbox = () => {
//     createLightbox();
//     handleNavigation();
//     handleClose();
//   }
  
//   initLightbox();
// // Récupération de tous les éléments de la page
// const mediaElements = document.querySelectorAll('.media-card');

// // Ajout d'un gestionnaire d'événement sur chaque élément
// mediaElements.forEach(element => {
//   element.addEventListener('click', event => {
//     event.preventDefault(); // Empêche le comportement par défaut
//     showLightbox();
//   });
// });