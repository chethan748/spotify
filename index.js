console.log('working');

// 1. Utility function
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


let audio = new Audio();
let currentSong = "";
let currentLi = null;
let currentIndex = -1;
let songs = [];

// SVGs
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Z"/></svg>`;

// 3. Fetch songs
async function getsong(folder) {
    let a = await fetch(`"http://127.0.0.1:5500/songs/${folder}"/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let song = [];
    for (let element of as) {
        if (element.href.endsWith(".mp3")) {
            song.push(element.href.split("")[1]);
        }
    }
    return song;
}

// 4. Play Music
const playmusic = (track, li) => {
    currentIndex = songs.indexOf(track);

    if (currentSong !== track) {
        audio.src = "/songs/" + track;
        audio.play();
        currentSong = track;

        document.querySelector(".songname").innerHTML =
            track.replaceAll("%20", " ").replaceAll("%26", " ").slice(0, 19);

        if (currentLi) {
            currentLi.querySelector(".btn").innerHTML = playIcon;
        }
        currentLi = li;
    } else {
        if (audio.paused) audio.play();
        else audio.pause();
    }
};

// 5. Sync Icons
audio.addEventListener("play", () => {
    document.querySelector(".play").innerHTML = pauseIcon;
    if (currentLi) currentLi.querySelector(".btn").innerHTML = pauseIcon;
});

audio.addEventListener("pause", () => {
    document.querySelector(".play").innerHTML = playIcon;
    if (currentLi) currentLi.querySelector(".btn").innerHTML = playIcon;
});

// 6. Time Update
audio.addEventListener("timeupdate", () => {
    const current = secondsToMinutesSeconds(audio.currentTime);
    const total = secondsToMinutesSeconds(audio.duration || 0);
    document.querySelector(".songd").innerHTML = `${current} / ${total}`;
    document.querySelector(".circle").style.left =
        (audio.currentTime / audio.duration) * 100 + "%";
});

// 7. Main
async function main() {
    songs = await getsong();
    let songsul = document.querySelector(".songslist ul");

    for (const song of songs) {
        songsul.innerHTML += `
        <li data-song="${song}">
            <span class="music">🎵</span>
            <span><p>${song.replaceAll("%20", " ").replaceAll("%26", " ").slice(0, 19)}</p></span>
            <span class="btn">${playIcon}</span>
        </li>`;
    }

    Array.from(songsul.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            playmusic(li.dataset.song, li);
        });
    });
}

// 8. Seekbar Play Button
document.querySelector(".play").addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) audio.play();
    else audio.pause();
});

// 9. Previous
document.querySelector(".beforeplay").addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    let song = songs[currentIndex];
    let li = document.querySelector(`li[data-song="${song}"]`);
    playmusic(song, li);
});

// 10. Next
document.querySelector(".nextplay").addEventListener("click", () => {
    if (currentIndex >= songs.length - 1) return;
    currentIndex++;
    let song = songs[currentIndex];
    let li = document.querySelector(`li[data-song="${song}"]`);
    playmusic(song, li);
});

// 11. Auto Next
audio.addEventListener("ended", () => {
    if (currentIndex >= songs.length - 1) return;
    currentIndex++;
    let song = songs[currentIndex];
    let li = document.querySelector(`li[data-song="${song}"]`);
    playmusic(song, li);
});

// 12. Sidebar
document.querySelector(".ham").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});
// ===== VOLUME CONTROL =====

const volumeBar = document.querySelector(".volumetracker");
const volumeCircle = document.querySelector(".circlevol");

audio.volume = 1;

let isDraggingVol = false;

document.addEventListener("mousedown", () => {
  isDraggingVol = true;
});
document.addEventListener("mouseup", () => {
  isDraggingVol = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isDraggingVol) return;

  const rect = volumeBar.getBoundingClientRect();
  let x = e.clientX - rect.left;

  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  const volume = x / rect.width;
  audio.volume = volume;
  volumeCircle.style.left = (volume * 100) + "%";
});

// Run
main();
