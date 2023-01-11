export default function mediaFactory(data) {
  const { name, image, title, likes, photographerId, video, id } = data;

  function getMediaDOM() {
    let media;
    if (image !== undefined) {
      media = `<img src="./assets/media/${photographerId}/${image}" id="lightbox-media" class="mediaChoice" alt=${title}>`;
    } else {
      media = `<video src="./assets/media/${photographerId}/${video}"  controls id="lightbox-media" class="mediaChoice" title=${title}></video>`;
    }

    return `
      <div class="media-card">
        <a class="media-link" href="./assets/media/${photographerId}/${image || video}">
          ${media}
        </a>
      </div>
      <div class="description-card">
        <p class="media-title">${title}</p>
        <div class="likes">
          <p class="media-likes" id="likes-${id}">${likes}</p>
          <i class="fa-solid fa-heart icon heart" id="heart-${id}"></i>
        </div>
      </div>
    `;
  }

  return { getMediaDOM };
}

