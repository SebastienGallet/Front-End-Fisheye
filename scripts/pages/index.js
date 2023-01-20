import { getPhotographers } from '../api.js'
import photographerFactory from '../factories/photographer.js'

async function displayData (photographers) {
  console.log(photographers)
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    const article = document.createElement('article')
    article.className = 'card'
    article.innerHTML = userCardDOM
    photographersSection.appendChild(article)
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

init()
