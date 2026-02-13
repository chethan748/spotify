console.log('working');
 async function  getsong(){
    let a= await fetch("http://127.0.0.1:5500/songs/")
let response= await a.text();
console.log(response)
let div=document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
 
    let song=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
           song.push(element.href.split("/songs/")[1]);
         
        }
        
    }
    return song


}
const playmusic =(track) => {
    
    let audio = new Audio("/songs/" + track);
    audio.play();
}


getsong()
async function main(){
    let currentsong;
    let songs=await getsong()
    let songsul=document.querySelector(".songslist").getElementsByTagName("ul")[0]
  for (const song of songs) {
    
    songsul.innerHTML= songsul.innerHTML+ ` <li>
    <div class="info">
                    <span class="music"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M127-167q-47-47-47-113t47-113q47-47 113-47 23 0 42.5 5.5T320-418v-342l480-80v480q0 66-47 113t-113 47q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T720-498v-165l-320 63v320q0 66-47 113t-113 47q-66 0-113-47Z"/></svg></span>
                    <span> <p class="info">${song.replaceAll("%20", " ").replaceAll("%26"," ").replaceAll("V%2C"," ").replaceAll(".mp3"," ").slice(0,19)}</p></span>'
                   <span><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></span>
               </div> </li>
             `;
  }
 Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e=>{

    console.log(e.querySelector(".info").firstElementChild.innerHTML[0])
    playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
 })


}
main()


