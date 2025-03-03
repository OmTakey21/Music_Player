console.log("Welcome to spotify")
//Initialize the variables
let songIndex=0;
let audioElement=new Audio('./../assets/songs/1.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let masterSongName=document.getElementById('songName')
let songItems=Array.from(document.getElementsByClassName("songItem"))
let time=document.getElementById('time')

let songs=[
    {songName:"Aaj Ki Raat", filePath: "./../assets/songs/1.mp3", coverPath: "./../assets/1.jpg"},
    {songName:"Aayi Nai", filePath: "./../assets/songs/2.mp3", coverPath: "./../assets/2.jpg"},
    {songName:"Agar Ho Tum", filePath: "./../assets/songs/3.mp3", coverPath: "./../assets/3.jpg"},
    {songName:"Apna Bana Le", filePath: "./../assets/songs/4.mp3", coverPath: "./../assets/4.jpg"},
    {songName:"BAAWE - HARD DRIVE", filePath: "./../assets/songs/5.mp3", coverPath: "./../assets/5.jpg"},
    {songName:"Ek Main Aur Ek Tu", filePath: "./../assets/songs/6.mp3", coverPath: "./../assets/6.jpg"},
    {songName:"Mere Mehboob Mere Sanam", filePath: "./../assets/songs/7.mp3", coverPath: "./../assets/7.jpg"},
    {songName:"Subhanallah", filePath: "./../assets/songs/8.mp3", coverPath: "./../assets/8.jpg"}
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText=songs[i].songName;
})
audioElement.play()
//handle play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('bi-play')
        masterPlay.classList.add('bi-pause')
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bi-pause')
        masterPlay.classList.add('bi-play')
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
   progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
   myProgressBar.value=progress
   const currentTime = audioElement.currentTime;
    time.textContent = formatTime(currentTime);
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100 
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('bi-pause')
        element.classList.add('bi-play')
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index=parseInt(e.target.id)
        if (e.target.classList.contains('bi-pause')) {
            // If it is playing, pause it
            e.target.classList.remove('bi-pause');
            e.target.classList.add('bi-play');
            
            audioElement.pause(); // Pause the audio
            gif.style.opacity = 0; // Hide the gif when paused
            masterPlay.classList.remove('bi-pause');
            masterPlay.classList.add('bi-play');
        } else {
            // If it's not playing, first stop all other songs
            makeAllPlay();
            
            // Play the clicked song
            e.target.classList.remove('bi-play');
            e.target.classList.add('bi-pause');
            
            audioElement.src = `./../assets/songs/${index}.mp3`;
            songIndex = index - 1; // Update the songIndex
            
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play(); // Start playing the song
            
            // Update UI for play state
            gif.style.opacity = 1;
            masterPlay.classList.remove('bi-play');
            masterPlay.classList.add('bi-pause');
        }
        time.innerText=parseInt((myProgressBar.value*audioElement.duration)/100) 
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`./../assets/songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songName
    audioElement.currentTime=0; 
    audioElement.play();
    masterPlay.classList.remove('bi-play')
    masterPlay.classList.add('bi-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=7;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`./../assets/songs/${songIndex+1}.mp3`
    masterSongName.innerText=songs[songIndex].songName
    audioElement.currentTime=0; 
    audioElement.play();
    masterPlay.classList.remove('bi-play')
    masterPlay.classList.add('bi-pause')
})
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}