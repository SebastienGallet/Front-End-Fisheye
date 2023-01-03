function getLightbox() {
    
    


    // return `
    // <svg id="fleche-gauche" width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>
    // </svg>
    // <div class="mediabox">
    //     ${media}
    //     <p class="media-title">${title}</p>
    // </div>
    // <svg id="close-lightbox" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
    // </svg>
    // <svg id="fleche-droite" width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 2.92828e-06L0.360108 5.64Z" fill="#911C1C"/>
    // </svg>`
}


/*--------------------------------------------------------------*/
// Création de l'élément lightbox et de ses éléments enfants (flèches de navigation et bouton de fermeture)
// Stockage de l'index du média actuellement affiché dans la lightbox
let currentIndex;

document.querySelectorAll('.media-link').forEach((media) => {
  media.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('ca click')
    const lightbox = document.querySelector('.lightbox');
    // Affichage de la lightbox et chargement du contenu du média dans la lightbox
    lightbox.style.opacity = 1;
    lightbox.querySelector('.lightbox__content').innerHTML = media[currentIndex].innerHTML;

    // Mise à jour de l'index du média actuellement affiché dans la lightbox
    currentIndex = Array.from(document.querySelectorAll('.media')).indexOf(media);

    // Écouteur d'événement click sur les boutons de navigation et de fermeture
    lightbox.querySelectorAll('.lightbox__nav, .lightbox__close').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        // Mise à jour de l'index du média en fonction du bouton cliqué
        if (button.classList.contains('lightbox__nav--prev')) {
          currentIndex = (currentIndex > 0) ? currentIndex - 1 : media.length - 1;
        } else if (button.classList.contains('lightbox__nav--next')) {
          currentIndex = (currentIndex < media.length - 1) ? currentIndex + 1 : 0;
        }

        // Mise à jour du contenu de la lightbox en fonction de l'index mis à jour
        lightbox.querySelector('.lightbox__content').innerHTML = media[currentIndex].innerHTML;

        // Fermeture de la lightbox si le bouton de fermeture est cliqué
        if (button.classList.contains('lightbox__close')) {
          lightbox.style.opacity = 0;
        }
      });
    });
  });
});