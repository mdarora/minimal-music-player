const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const music = document.querySelector("audio");

let isPlaying = false;
playBtn.addEventListener("click", ()=>{
    if (isPlaying){
        isPlaying = false;
        music.pause();
        playBtn.setAttribute("title", "Play");
        playBtn.classList.replace("fa-pause", "fa-play");
    } else{
        isPlaying = true;
        music.play();
        playBtn.setAttribute("title", "Pause");
        playBtn.classList.replace("fa-play", "fa-pause");
    }
})