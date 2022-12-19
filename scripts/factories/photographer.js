function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.href = `photographer.html?photographer=${id}`;
        link.ariaLabel = `Page de ${name}`;
        

        const article = document.createElement( 'article' );
        article.className = "card";

        const img = document.createElement( 'img' );
        const picture = `assets/photographers/${portrait}`;
        img.setAttribute("src", picture);
        img.setAttribute('alt', `Photo de profil du photogrape ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.className = 'location';

        const taglineContent = document.createElement('p');
        taglineContent.textContent = tagline;
        taglineContent.className = "tagline";

        const priceContent = document.createElement('p');
        priceContent.textContent = `${price}€/jour`;
        priceContent.className = 'price';
        
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        article.appendChild(location);
        article.appendChild(taglineContent);
        article.appendChild(priceContent);

        return (article);
    }

    return {getUserCardDOM}

}
