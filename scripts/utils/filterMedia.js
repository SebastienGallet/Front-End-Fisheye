export function sortMedia(medias, selectedOption) {
  switch (selectedOption) {
      case "Popularité":
          medias.sort(function(a, b) {
              return b.likes - a.likes;
          });
          break;
      case "Date":
          medias.sort(function(a, b) {
              return new Date(b.date) - new Date(a.date);
          });
          break;
      case "Titre":
          medias.sort(function(a, b) {
              var nameA = a.title.toUpperCase();
              var nameB = b.title.toUpperCase();
              if (nameA < nameB) {
                  return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
              return 0;
          });
          break;
  }
}
