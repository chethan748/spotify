console.log('working');

async function getsong(){
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let song = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
           song.push(element.href.split("/songs/")[1]);
        }
    }
    return song;
}

let audio = new Audio();
let currentSong = "";
let currentLi = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`

const playmusic = (track, li) => {

    // new song
    if (currentSong !== track) {
        audio.src = "/songs/" + track;
        audio.play();
        currentSong = track;

       
        if (currentLi) {
          //
        
             div=document.querySelector(".icons").querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`
            

        }

       
        li.querySelector(".btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`
          div=document.querySelector(".icons").querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`
        currentLi = li;
    }
 
    else {
        if (audio.paused) {
            audio.play();
            li.querySelector(".btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`
         div=document.querySelector(".icons").querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`
            
        } else {
            audio.pause();
            li.querySelector(".btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`
            div=document.querySelector(".icons").querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`
            
            
            
        }
    }
}

async function main(){
    let songs = await getsong();
    let songsul = document.querySelector(".songslist").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songsul.innerHTML += `
        <li data-song="${song}">
            <span class="music">🎵</span>
            <span>
                <p>
                ${song.replaceAll("%20", " ")
                      .replaceAll("%26"," ")
                      .replaceAll("V%2C"," ")
                      .replaceAll(".mp3"," ")
                      .slice(0,19)}
                </p>
            </span>
            <span class="btn"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>'</svg></span>
        </li>
        `;
    }

    Array.from(songsul.getElementsByTagName("li")).forEach(li=>{
        li.addEventListener("click", () => {
            playmusic(li.dataset.song, li);
        })
    });
}
document.querySelector(".play").addEventListener("click", () => {
 
     
            if (audio.src) {
                if(audio.paused){
            audio.play();
            // Update icon to Pause
        document.querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`
        } else {
            audio.pause();
             document.querySelector(".play").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`
            // Update icon to Play40 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`
        }
    }
            
    
    
});
document.querySelector(".ham").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0px";
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%";
    })
main()

function secondsToMinutesSeconds(seconds) {
   
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }


    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');


    return `${formattedMinutes}:${formattedSeconds}`;
}

audio.addEventListener("timeupdate", () => {
    
   
    console.log(audio.currentTime, audio.duration);
    
  
    const timeDisplay = document.querySelector(".songd").innerHTML = `${secondsToMinutesSeconds(audio.currentTime)}/${secondsToMinutesSeconds(audio.duration)}`;
 
});
