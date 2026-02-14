console.log('working');

// 1. Utility function to format time (MM:SS)
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// 2. Global Variables
let audio = new Audio();
let currentSong = "";
let currentLi = null; // Stores the <li> element of the currently playing song

// SVGs for reuse
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`;

// 3. Fetch songs from server
async function getsong() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let song = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            song.push(element.href.split("/songs/")[1]);
        }
    }
    return song;
}

// 4. Play Music Function
const playmusic = (track, li) => {
    if (currentSong !== track) {
        audio.src = "/songs/" + track;
        audio.play();
        currentSong = track;
        
        // Reset the previous LI icon if it exists
        if (currentLi) {
            currentLi.querySelector(".btn").innerHTML = playIcon;
        }
        currentLi = li;
    } else {
        // If it's the same song, just toggle
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

// 5. SYNC LOGIC: Listen to the audio object itself to change icons
audio.addEventListener("play", () => {
    // Update Seekbar Icon
    document.querySelector(".play").innerHTML = pauseIcon;
    // Update List Icon
    if (currentLi) {
        currentLi.querySelector(".btn").innerHTML = pauseIcon;
    }
});

audio.addEventListener("pause", () => {
    // Update Seekbar Icon
    document.querySelector(".play").innerHTML = playIcon;
    // Update List Icon
    if (currentLi) {
        currentLi.querySelector(".btn").innerHTML = playIcon;
    }
});

// 6. Time Update (Seekbar and Timer)
audio.addEventListener("timeupdate", () => {
    const current = secondsToMinutesSeconds(audio.currentTime);
    const total = secondsToMinutesSeconds(audio.duration || 0);
    document.querySelector(".songd").innerHTML = `${current} / ${total}`;
});

// 7. Main Function to Initialize
async function main() {
    let songs = await getsong();
    let songsul = document.querySelector(".songslist").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songsul.innerHTML += `
        <li data-song="${song}">
            <span class="music">🎵</span>
            <span>
                <p>${song.replaceAll("%20", " ").replaceAll("%26", " ").slice(0, 19)}</p>
            </span>
            <span class="btn">${playIcon}</span>
        </li>`;
    }

    // List Item Clicks
    Array.from(songsul.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            playmusic(li.dataset.song, li);
        });
    });
}

// 8. Seekbar Play Button Click
document.querySelector(".play").addEventListener("click", () => {
    if (audio.src) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
});

// 9. Navigation (Hamburger/Close)
document.querySelector(".ham").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
});

// Run
main()