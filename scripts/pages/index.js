import { getPhotographers } from '../api.js'
import photographerFactory from '../factories/photographer.js'

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    const article = document.createElement('article')
    article.className = 'card'
    article.innerHTML = userCardDOM
    photographersSection.appendChild(article)
  })
  // Navigation au clavier entre les photographes
  const cards = document.querySelectorAll('.card a')
  cards.forEach((photographer, index) => {
    photographer.tabIndex = index + 1
    photographer.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        const nextIndex = index + 1
        if (nextIndex < cards.length) {
          cards[nextIndex].focus()
        }
      }
      if (event.code === 'ArrowLeft') {
        const prevIndex = index - 1
        if (prevIndex >= 0) {
          cards[prevIndex].focus()
        }
      }
      // Ouverture de la page du photographe
      if (event.code === 'Enter') {
        window.location.assign(photographer.dataset.url)
      }
    })
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

init()
