async function  displayProfil(photographer) {
    const section = document.querySelector('.photograph-header')
    const photographerModel = photographerFactory(photographer);
    const photographeHeader = photographerModel.getOnePhotographerDOM();
    let div = document.createElement('div')
    div.innerHTML = photographeHeader
    section.appendChild(div)
};

async function displayMedia(photographer, media){
    
    
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographersById();
    displayProfil(photographers);
};
    
init();


