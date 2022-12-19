function profilFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    function getOnePhotographerDOM() {
        return `
            <div id="photographer-details">
                <h1>${name}</h1>
                    <p id="location">${city}, ${country}</p>
                    <p id="tagline">${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="./assets/photographers/${portrait}/>`
    }
    return {getOnePhotographerDOM}

}
