'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const src = 'https://310401.selcdn.ru/MIXED/caitlin-de-ville-attention.mp3';
    let myAudio = new Audio(src);
    myAudio.addEventListener("canplaythrough", event => {
        myAudio.play();
      });
});