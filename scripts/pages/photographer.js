//Mettre le code JavaScript lié à la page photographer.html

const urlData = window.location.search
console.log(urlData)
const searchParams = new URLSearchParams(urlData)
const id = searchParams.get('photographer')
console.log(id)


async function getPhotographers() {
    return fetch('data/photographers.json')
        .then(response => response.json())

}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    /*let user = photographers.filter((user) => user.id == id);
    console.log(user)
    const photographerModel = photographerFactory(user);
    const photographerHeader = photographerModel.getOnePhotographerDOM();
    photographersSection.appendChild(photographerHeader);*/
  }
