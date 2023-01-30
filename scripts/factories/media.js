export default function mediaFactory (data) {
  const { image, title, likes, photographerId, video, id } = data

  function getMediaDOM () {
    let media
    if (image !== undefined) {
      media = `<button id="buttonmedia" tabindex="-1"><img src="assets/media/${photographerId}/${image}" id="lightbox-media" class="mediaChoice" alt="${title}" data-media-type="image" tabindex="0"></button>`
    } else {
      media = `<button button id="buttonmedia" tabindex="-1"><video src="assets/media/${photographerId}/${video}"  controls id="lightbox-media" class="mediaChoice" title="${title}" data-media-type="video" tabindex="0"></video></button>`
    }

    return `
      <div class="media-card">
          ${media}
      </div>
      <div class="description-card">
        <p class="media-title">${title}</p>
        <div class="likes">
          <p class="media-likes" id="likes-${id}">${likes}</p>
          <button tabindex="-1"><i class="fa-solid fa-heart icon heart" id="heart-${id}" aria-label="Ajouter un like" tabindex="0"></i></button>
        </div>
      </div>
    `
  }

  return { getMediaDOM }
}
