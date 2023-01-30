import { getPhotographersById, getMediaById } from '../api.js'
import photographerFactory from '../factories/photographer.js'
import mediaFactory from '../factories/media.js'
import { sortMedia } from '../utils/filterMedia.js'
import lightbox from '../utils/lightbox.js'

// HEADER BLOCK
async function displayProfil (photographer) {
  const section = document.querySelector('.photograph-header')
  const photographerModel = photographerFactory(photographer)
  const photographerHeader = photographerModel.getOnePhotographerDOM()
  section.insertAdjacentHTML('beforeend', `<div class="headerblock">${photographerHeader}</div>`)
}

const photographer = await getPhotographersById()
const medias = await getMediaById()

// GESTION DU TRIAGE
const selectElement = document.querySelector('select')
const sortlist = document.querySelector('.sort-list')
selectElement.addEventListener('click', () => {
  selectElement.style.display = 'none'
  sortlist.style.display = 'flex'
})
selectElement.addEventListener('change', () => {
  const selectedOption = selectElement.value
  sortMedia(medias, selectedOption)

  const section = document.querySelector('.medias')
  section.innerHTML = ''
  displayMedia(medias, photographer)
})

const sortEntries = document.querySelectorAll('.sort-entry')
sortEntries.forEach(entry => {
  entry.addEventListener('click', function (event) {
    selectElement.style.display = 'flex'
    sortlist.style.display = 'none'
    const selectedId = event.target.dataset.id
    const select = document.querySelector('select')
    switch (selectedId) {
      case 'Popularité':
        select.options.selectedIndex = 1 // Popularité is the second option
        break
      case 'Date':
        select.options.selectedIndex = 0 // Date is the first option
        break
      case 'Titre':
        select.options.selectedIndex = 2 // Titre is the third option
        break
    }
    sortMedia(medias, select.value)
    const section = document.querySelector('.medias')
    section.innerHTML = ''
    displayMedia(medias, photographer)
  })
})

// GESTION DE L'AFFICHAGE DES MEDIAS
async function displayMedia (medias) {
  const section = document.querySelector('.medias')
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media)
    const photographerMedia = mediaModel.getMediaDOM()
    section.insertAdjacentHTML('beforeend', `<div class="card">${photographerMedia}</div>`)

    // Récupération le coeur en utilisant l'id unique de la photo
    const heart = document.querySelector(`#heart-${media.id}`)
    const likesElement = document.querySelector(`#likes-${media.id}`)

    // Récupération de l'état actuel du coeur et du like à partir de localStorage
    let liked = JSON.parse(localStorage.getItem(`liked-${media.id}`)) || false
    let likes = JSON.parse(localStorage.getItem(`likes-${media.id}`)) || media.likes

    // Mise à jour de l'affichage en fonction de l'état actuel
    if (liked) {
      heart.style.color = 'red'
      likesElement.style['font-size'] = '24px'
      likesElement.style.color = '#901C1C'
    } else {
      heart.style.color = 'grey'
      likesElement.style['font-size'] = '16px'
      likesElement.style.color = 'black'
    }

    likesElement.textContent = `${likes}`

    // Ajoutez un événement click sur le coeur
    function likesGestion () {
      if (!liked) {
        likes += 1
        liked = true
        heart.style.color = 'red'
        likesElement.style['font-size'] = '24px'
        likesElement.style.color = '#901C1C'
      } else {
        likes -= 1
        liked = false
        heart.style.color = 'grey'
        likesElement.style['font-size'] = '16px'
        likesElement.style.color = 'black'
      }
      likesElement.textContent = `${likes}`
      media.likes = likes
      let totalLikes = 0
      medias.forEach((media) => {
        totalLikes += media.likes
        const totalLikesElement = document.querySelector('.total-likes')
        totalLikesElement.textContent = `${totalLikes}`
        localStorage.setItem('totalLikes', totalLikes)
      })
      // stockage dans le ls
      if (liked) {
        localStorage.setItem(`liked-${media.id}`, JSON.stringify(liked))
      } else {
        localStorage.removeItem(`liked-${media.id}`)
      }
      localStorage.setItem(`likes-${media.id}`, likes)
    }

    heart.addEventListener('click', likesGestion)
    heart.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        likesGestion()
      }
    })
  })
  // Mise en place du tabindex pour l'accessibilité au clavier
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    card.setAttribute('tabindex', '-1')
  })

  lightbox.init()
}

function updateTotalLikes () {
  let totalLikes = 0
  medias.forEach((media) => {
    totalLikes += media.likes
  })
  const totalLikesElement = document.querySelector('.total-likes')
  totalLikesElement.textContent = `${totalLikes}`
  const priceElement = document.querySelector('.price')
  priceElement.innerHTML = `${photographer.price}€ / jour`
}

// charger les données du ls
let totalLikes = JSON.parse(localStorage.getItem('totalLikes')) || 0

// Mettre à jour les données des médias avec les données de likes chargées
medias.forEach((media) => {
  media.likes = JSON.parse(localStorage.getItem(`likes-${media.id}`)) || media.likes
  totalLikes += media.likes
})

localStorage.setItem('totalLikes', totalLikes)

// MAJ du total au chargement de la page
updateTotalLikes()

displayProfil(photographer)
displayMedia(medias, photographer)
