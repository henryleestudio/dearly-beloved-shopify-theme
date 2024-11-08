function pauseAllMedia() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.pause());
    document.querySelectorAll('product-model').forEach((model) => {
      if (model.modelViewerUI) model.modelViewerUI.pause();
    });
  }
  function playAllMedia() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"play"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.play());
    document.querySelectorAll('product-model').forEach((model) => {
      if (model.modelViewerUI) model.modelViewerUI.play();
    });
  }
  
  
  class CustomDeferredMedia extends HTMLElement {
    constructor() {
      super();
      const poster = this.querySelector('.cover-image');
      if (!poster) return;
      poster.addEventListener('click', this.loadContent.bind(this));
    }
  
    loadContent(focus = true) {
      pauseAllMedia();
      if (!this.getAttribute('loaded')) {
        const content = document.createElement('div');
        if( window.innerWidth < 750 && this.querySelector('template').content.querySelector('.js-mobile-video')){
          content.appendChild(this.querySelector('template').content.querySelector('.js-mobile-video').cloneNode(true));
        }else{      
          content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
        }
        
        this.setAttribute('loaded', true);
        const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
        if (focus) deferredElement.focus();
        if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
          /*force autoplay for safari*/
          deferredElement.play();
        }else{
          deferredElement.height = this.clientHeight;
          deferredElement.width = this.clientWidth;
        }
      }
    }
  }
  
  customElements.define('custom-deferred-media', CustomDeferredMedia);