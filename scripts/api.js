const url = "./../data/photographers.json";
// Retourne une promise contenant média et photographers
async function getData() {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


// Medias by id
async function getMediaById(id){
    const { media } = await getData();
    return media.filter(m => m.photographerId === id );
}

// Tout les photographes
async function getPhotographers(){
    const photographers = await getData();
    return photographers;
}
// Photographes par id
async function getPhotographersById(){
    const { photographers } = await getData();
    const urlData = window.location.search
    const getParams = new URLSearchParams(urlData)
    const idPhotograher = getParams.get('photographer')
    const photographer = photographers.find((e) => idPhotograher == e.id)
    console.log(photographer)
    return photographer
}




