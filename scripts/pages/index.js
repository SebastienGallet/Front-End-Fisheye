async function displayData(photographers) {
    console.log(photographers)
    
    photographers.forEach((photographer) => {
        const photographersSection = document.querySelector(".photographer_section");
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        let article = document.createElement('article')
        article.className = "card";
        article.innerHTML = userCardDOM
        photographersSection.appendChild(article)
    });
};


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();

    
