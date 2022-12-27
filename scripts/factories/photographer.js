function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        return`
            <a href="photographer.html?photographer=${id}", aria-label="Page de ${name}"/>
                <img src="assets/photographers/${portrait}" alt="Photo de profil du photographe ${name}">
                <h2>${name}</h2>
            </a>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>
        `
    }

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
    return {name, picture, getUserCardDOM, getOnePhotographerDOM}
        
}





        // function getUserCardDOM() {
        //     const link = document.createElement('a');
        //     link.href = `photographer.html?photographer=${id}`;
        //     link.ariaLabel = `Page de ${name}`;
            
    
        //     const article = document.createElement( 'article' );
        //     article.className = "card";
    
        //     const img = document.createElement( 'img' );
        //     const picture = `assets/photographers/${portrait}`;
        //     img.setAttribute("src", picture);
        //     img.setAttribute('alt', `Photo de profil du photographe ${name}`);
    
        //     const h2 = document.createElement( 'h2' );
        //     h2.textContent = name;
    
        //     const location = document.createElement('p');
        //     location.textContent = `${city}, ${country}`;
        //     location.className = 'location';
    
        //     const taglineContent = document.createElement('p');
        //     taglineContent.textContent = tagline;
        //     taglineContent.className = "tagline";
    
        //     const priceContent = document.createElement('p');
        //     priceContent.textContent = `${price}€/jour`;
        //     priceContent.className = 'price';
            
        //     link.appendChild(img);
        //     link.appendChild(h2);
        //     article.appendChild(link);
    
        //     article.appendChild(location);
        //     article.appendChild(taglineContent);
        //     article.appendChild(priceContent);
    
        //     return (article);