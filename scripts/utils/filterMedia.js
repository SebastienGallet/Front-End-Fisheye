export function sortMedia(medias, sortType) {
  
    if (sortType === 'popularité') {
      medias.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        } else if (a.likes < b.likes) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortType === 'date') {
      medias.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortType === 'titre') {
      medias.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
}

