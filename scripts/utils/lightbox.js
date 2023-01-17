
  /*---------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------
  -------------------------------LIGHTBOX--------------------------------------------
  -----------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------*/
  class lightbox {
    static init() {
      const links = Array.from(document.querySelectorAll('.mediaChoice'))
      const gallery = links.map(link => link.getAttribute('src'))
  
      links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        new lightbox(e.currentTarget, gallery)
      }))
    }
  
    constructor(mediaElement, images) {
      this.mediaElement = mediaElement
      this.images = images
      this.currentIndex = images.findIndex(image => image === mediaElement.getAttribute('src'))
      this.url = images[this.currentIndex]
      this.element = this.buildDOM()
      this.loadMedia()
      this.onKeyUp = this.onKeyUp.bind(this)
      document.body.appendChild(this.element)
      document.addEventListener('keyup', this.onKeyUp)
    }
  
    loadMedia() {
      const container = this.element.querySelector('.lightbox_container')
      const loader = document.createElement('div')
      loader.classList.add('lightbox_loader')
      container.innerHTML = ''
      container.appendChild(loader)
    
      // Determiner le type de media
      let mediaType = this.mediaElement.getAttribute("data-media-type")
    
      if (mediaType === "image" && mediaType!=null) {
        const image = new Image()
        image.onload = () => {
          container.removeChild(loader)
          container.appendChild(image)
        }
        image.src = this.images[this.currentIndex]
      } else if (mediaType === "video" && mediaType!=null) {
        const video = document.createElement('video')
        video.src = this.images[this.currentIndex]
        video.controls = true
        video.onloadeddata = () => {
          container.removeChild(loader)
          container.appendChild(video)
        }
      }
      else{
        //if unknown media type
        container.removeChild(loader);
        container.innerHTML = "Type de media non reconnu"
      }
    }
    
  
    buildDOM() {
      return `
      <div class="lightbox_overlay fadeIn">
        <div class="lightbox_container">
        </div>
        <i class="fa-solid fa-times icon close" id="close"></i>
        <i class="fa-solid fa-arrow-left icon prev" id="prev"></i>
        <i class="fa-solid fa-arrow-right icon next" id="next"></i>
      </div>
      `
    }
    
    onKeyUp(e) {
      if (e.key === 'Escape') {
        this.close(e)
      } else if (e.key === 'ArrowLeft') {
        this.prev(e)
      } else if (e.key === 'ArrowRight') {
        this.next(e)
      }
    }
    
    close(e) {
      e.preventDefault()
      this.element.classList.add('fadeOut')
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
      }, 500)
      document.removeEventListener('keyup', this.onKeyUp)
    }
    
    prev(e) {
      e.preventDefault();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.url = this.images[this.currentIndex];
      this.mediaElement = document.querySelector(`img[src="${this.url}"], video[src="${this.url}"]`);
      this.loadMedia();
    }
  
    next(e) {
      e.preventDefault();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.url = this.images[this.currentIndex];
      this.mediaElement = document.querySelector(`img[src="${this.url}"], video[src="${this.url}"]`);
      this.loadMedia();
    }

      /**
       * @param {string} url 
       * @return {HTMLElement}
      */
      buildDOM(url){
          const dom = document.createElement('div')
          dom.classList.add('lightbox')
          dom.innerHTML = `<button class="lightbox_close"></button>
          <button class="lightbox_next"></button>
          <button class="lightbox_prev"></button>
          <div class="lightbox_container">
          </div>`
          dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
          dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this))
          dom.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this))
          return dom
      }
      
  }
  
  lightbox.init()
  /*---------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------
  ------------------------------- FIN LIGHTBOX---------------------------------------
  -----------------------------------------------------------------------------------
  ---------------------------------------------------------------------------------*/