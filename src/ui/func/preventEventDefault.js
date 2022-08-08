"use stric";

const imageForm = document.getElementById('imageForm');
const videoForm = document.getElementById('videoForm');

function prevDefault (e) {
    e.preventDefault();
}

imageForm.addEventListener('submit', prevDefault);
videoForm.addEventListener('submit', prevDefault);