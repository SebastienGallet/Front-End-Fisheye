export default function photographerFactory (data) {
  const { name, id, city, country, tagline, price, portrait } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    return `
            <a href="photographer.html?photographer=${id}", aria-label="Page de ${name}"/>
                <img src="assets/photographers/${portrait}" alt="Photo de profil du photographe ${name}">
                <h2>${name}</h2>
            </a>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>
        `
  }

  function getOnePhotographerDOM () {
    return `
            <div id="photographer-details">
                <h1>${name}</h1>
                    <p id="location">${city}, ${country}</p>
                    <p id="tagline">${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="assets/photographers/${portrait}" alt="Photo de profil du photographe ${name}">`
  }

  return { name, picture, getUserCardDOM, getOnePhotographerDOM }
}
