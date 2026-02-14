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
let currentLi = null;   // track which button is active

const playmusic = (track, li) => {

    // new song
    if (currentSong !== track) {
        audio.src = "/songs/" + track;
        audio.play();
        currentSong = track;

        // reset old button
        if (currentLi) {
            currentLi.querySelector(".btn").innerHTML = "▶";
        }

        // set new button
        li.querySelector(".btn").innerHTML = "⏸";
        currentLi = li;
    }
    // same song → toggle
    else {
        if (audio.paused) {
            audio.play();
            li.querySelector(".btn").innerHTML = "⏸";
        } else {
            audio.pause();
            li.querySelector(".btn").innerHTML = "▶";
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
            <span class="btn">▶</span>
        </li>
        `;
    }

    Array.from(songsul.getElementsByTagName("li")).forEach(li=>{
        li.addEventListener("click", () => {
            playmusic(li.dataset.song, li);
        })
    });
}

main();
