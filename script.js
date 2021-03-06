const coverImg = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTiming = document.getElementById("crnt-timing");
const totalDuration = document.getElementById("total-duration");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const music = document.querySelector("audio");
const innerProgressBar = document.getElementById("inner-bar");
const ProgressBar = document.getElementById("progress-bar");

const songs = [
    {
        title:"Aadat",
        artist:"Sucha Yaar",
        coverImage:"./img/jacinto-1.jpg",
        filePath:"./music/Aadat Sucha Yaar.mp3"
    },
    {
        title:"Adhi adhi raat",
        artist:"Bilal Saeed",
        coverImage:"./img/jacinto-2.jpg",
        filePath:"./music/Adhi-Adhi-Raat-Bilal-Saeed.mp3"
    },
    {
        title:"Akhian",
        artist:"Happy Raikoti",
        coverImage:"./img/jacinto-3.jpg",
        filePath:"./music/Akhian - Happy Raikoti.mp3"
    },
];

let isPlaying = false;
function playSong(){
    isPlaying = true;
    music.play();
    playBtn.setAttribute("title", "Pause");
    playBtn.classList.replace("fa-play", "fa-pause");
}
function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.setAttribute("title", "Play");
    playBtn.classList.replace("fa-pause", "fa-play");
}

function loadSong(index){
    coverImg.src = songs[index].coverImage;
    music.src = songs[index].filePath;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}


let songIndex = 0;
function prevSong(){
    songIndex--;
    songIndex = songIndex < 0 ? songs.length - 1 : songIndex;
    loadSong(songIndex);
    playSong();
}
function nextSong(){
    songIndex++;
    songIndex = songIndex > songs.length - 1  ? 0 : songIndex;
    loadSong(songIndex);
    playSong();
}

function updateProgress(e){
    if(isPlaying){
        const {duration, currentTime} =  e.srcElement;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
        if(durationSeconds){
            totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
        if(currentSeconds){
            currentTiming.textContent = `${currentMinutes}:${currentSeconds}`;
        }

        innerProgressBar.style.width = `${(currentTime / duration) * 100}%`;
        
    }
}

function changeCurrentTime(e){
    const {duration} = music;
    music.currentTime = `${(e.offsetX / this.clientWidth) * duration}`;
    playSong();
}


loadSong(songIndex);

music.addEventListener("timeupdate", updateProgress);
music.addEventListener("ended", nextSong);
ProgressBar.addEventListener("click", changeCurrentTime);
playBtn.addEventListener("click", ()=> isPlaying ? pauseSong() : playSong());
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);