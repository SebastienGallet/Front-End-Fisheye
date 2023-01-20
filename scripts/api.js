/* eslint-disable eqeqeq */
const url = './../data/photographers.json'
// Retourne une promise contenant média et photographers
let data

async function getData () {
  if (data) {
    return data
  }

  try {
    const res = await fetch(url)
    data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// Medias by id
async function getMediaById () {
  const { media } = await getData()
  const urlData = window.location.search
  const getParams = new URLSearchParams(urlData)
  const photographerId = getParams.get('photographer')
  const mediaByPhotographer = media.filter((e) => photographerId == e.photographerId)
  return mediaByPhotographer
}

// Tout les photographes
async function getPhotographers () {
  const photographers = await getData()
  return photographers
}
// Photographes par id
async function getPhotographersById () {
  const { photographers } = await getData()
  const urlData = window.location.search
  const getParams = new URLSearchParams(urlData)
  const idPhotograher = getParams.get('photographer')
  const photographer = photographers.find((e) => idPhotograher == e.id)
  console.log(photographer)
  return photographer
}

export { getPhotographers, getPhotographersById, getMediaById }
