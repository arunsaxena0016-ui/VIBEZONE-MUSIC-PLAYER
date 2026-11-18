
// SONG DATABASE

const songs=[
{id:"tumhiho",title:"Tum Hi Ho",artist:"Arijit Singh",src:"songs/tum-hi-ho.mp3",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"},
{id:"kesariya",title:"Kesariya",artist:"Arijit Singh",src:"songs/kesariya.mp3",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"},
{id:"channa",title:"Channa Mereya",artist:"Arijit Singh",src:"songs/channa-mereya.mp3",image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500"},

{id:"teriore",title:"Teri Ore",artist:"Shreya Ghoshal",src:"songs/teri-ore.mp3",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500"},
{id:"saans",title:"Saans",artist:"Shreya Ghoshal",src:"songs/saans.mp3",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"},
{id:"deewani",title:"Deewani Mastani",artist:"Shreya Ghoshal",src:"songs/deewani-mastani.mp3",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"},

{id:"tera",title:"Tera Hone Laga Hoon",artist:"Atif Aslam",src:"songs/tera-hone-laga-hoon.mp3",image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500"},
{id:"pehli",title:"Pehli Nazar Mein",artist:"Atif Aslam",src:"songs/pehli-nazar-mein.mp3",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500"},

{id:"love",title:"Love Story",artist:"Taylor Swift",src:"songs/love-story.mp3",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"},
{id:"blank",title:"Blank Space",artist:"Taylor Swift",src:"songs/blank-space.mp3",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"},

{id:"perfect",title:"Perfect",artist:"Ed Sheeran",src:"songs/perfect.mp3",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"},
{id:"shape",title:"Shape of You",artist:"Ed Sheeran",src:"songs/shape-of-you.mp3",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500"},

{id:"blinding",title:"Blinding Lights",artist:"The Weeknd",src:"songs/blinding-lights.mp3",image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500"},
{id:"starboy",title:"Starboy",artist:"The Weeknd",src:"songs/starboy.mp3",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"}
];

// SINGER DATABASE

const artists=[
{name:"Arijit Singh",type:"Indian Playback Singer",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Arijit_Singh_performance_at_Chandigarh_2025.jpg",backup:"https://commons.wikimedia.org/wiki/Special:FilePath/Arijit%20Singh.jpg",class:"arijit"},

{name:"Shreya Ghoshal",type:"Indian Playback Singer",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Shreya.Ghoshal.jpg",class:"shreya"},

{name:"Atif Aslam",type:"Playback Singer",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Atif%20Aslam%20in%20black%20coat.jpg",class:""},

{name:"Taylor Swift",type:"Singer & Songwriter",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Taylor%20Swift%202022.jpg",class:""},

{name:"Ed Sheeran",type:"Singer & Songwriter",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ed%20Sheeran.jpg",class:""},

{name:"The Weeknd",type:"Canadian Singer",image:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/03/20/11/the-weeknd.jpg?fit=crop&height=1200&width=1200",class:""}
];

// ELEMENTS

const $=id=>document.getElementById(id);
const song=$("song");

let currentSong=-1;
let currentList=[...songs];

let favorites=JSON.parse(localStorage.getItem("vibeFavorites")||"[]");
let playlists=JSON.parse(localStorage.getItem("vibePlaylists")||"{}");

function saveData(){
localStorage.setItem("vibeFavorites",JSON.stringify(favorites));
localStorage.setItem("vibePlaylists",JSON.stringify(playlists));
}

// DISPLAY ARTISTS

function displayArtists(){
$("artistList").innerHTML=artists.map(a=>`
<div class="artist ${a.class}">
<img src="${a.image}" alt="${a.name}"
onerror="this.onerror=null;this.src='${a.backup||"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"}'">
<h3>${a.name}</h3>
<p>${a.type}</p>
<button onclick="showSingerSongs('${a.name}')">🎵 View Songs</button>
</div>
`).join("");
}

// SINGER SONGS

function showSingerSongs(name){
currentList=songs.filter(s=>s.artist===name);
$("songHeading").textContent=name+" Songs 🎵";
displaySongCards(currentList);
$("trending").scrollIntoView({behavior:"smooth"});
}

// ALL SONGS

function showAllSongs(){
currentList=[...songs];
$("songHeading").textContent="All Songs 🔥";
$("searchInput").value="";
displaySongCards(currentList);
}

// SONG CARDS

function displaySongCards(list){
$("songList").innerHTML=list.length?list.map(s=>`
<div class="music-card">
<img src="${s.image}" alt="${s.title}">
<h3>${s.title}</h3>
<p>${s.artist}</p>
<div class="card-buttons">
<button onclick="playSong('${s.id}')">▶ Play</button>
<button class="${favorites.includes(s.id)?"fav-active":""}" onclick="toggleFavorite('${s.id}')">
${favorites.includes(s.id)?"♥ Favorite":"♡ Favorite"}
</button>
<button onclick="addToPlaylist('${s.id}')">+ Playlist</button>
</div>
</div>
`).join(""):'<p class="empty-message">No songs found.</p>';
}

// PLAY SONG

function playSong(id){
let index=songs.findIndex(s=>s.id===id);
if(index===-1)return;

currentSong=index;
let s=songs[currentSong];

song.src=s.src;

$("songTitle").textContent=s.title;
$("songArtist").textContent=s.artist;
$("songImage").src=s.image;

$("seekBar").value=0;
$("currentTime").textContent="0:00";
$("duration").textContent="0:00";

song.play().catch(()=>{
alert("Audio file not found! Please check this MP3 file: "+s.src);
});
}

// NEXT AND PREVIOUS

function nextSong(){
if(currentSong===-1)return;
playSong(songs[(currentSong+1)%songs.length].id);
}

function previousSong(){
if(currentSong===-1)return;
playSong(songs[(currentSong-1+songs.length)%songs.length].id);
}

$("playBtn").onclick=()=>{
if(currentSong===-1){
playSong(songs[0].id);
return;
}

if(song.paused){
song.play().catch(()=>alert("Please check your MP3 file."));
}else{
song.pause();
}
};

song.onplay=()=>$("playBtn").textContent="⏸";
song.onpause=()=>$("playBtn").textContent="▶";

$("nextBtn").onclick=nextSong;
$("prevBtn").onclick=previousSong;
song.onended=nextSong;

// FAVORITES

function toggleFavorite(id){
favorites=favorites.includes(id)
?favorites.filter(x=>x!==id)
:[...favorites,id];

saveData();
displaySongCards(currentList);
displayFavorites();
}

function displayFavorites(){
let list=songs.filter(s=>favorites.includes(s.id));

$("favoriteCount").textContent=list.length+" Songs";

$("favoriteList").innerHTML=list.length?list.map(s=>`
<div class="music-card">
<img src="${s.image}">
<h3>${s.title}</h3>
<p>${s.artist}</p>
<div class="card-buttons">
<button onclick="playSong('${s.id}')">▶ Play</button>
<button onclick="toggleFavorite('${s.id}')">♥ Remove</button>
</div>
</div>
`).join(""):'<p class="empty-message">No favorite songs yet.</p>';
}

// VOLUME AND MUTE

function updateVolume(){
let muted=song.muted||song.volume===0;

$("muteBtn").textContent=muted?"🔇":"🔊";
$("volumeValue").textContent=Math.round((muted?0:song.volume)*100)+"%";
$("volumeBar").value=song.volume;
}

$("volumeBar").oninput=e=>{
song.volume=Number(e.target.value);
song.muted=false;
updateVolume();
};

$("muteBtn").onclick=()=>{
song.muted=!song.muted;
updateVolume();
};

// SONG PROGRESS

function formatTime(t){
if(!Number.isFinite(t))return "0:00";

return Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0");
}

song.onloadedmetadata=()=>{
$("duration").textContent=formatTime(song.duration);
};

song.ontimeupdate=()=>{
$("currentTime").textContent=formatTime(song.currentTime);

if(song.duration){
$("seekBar").value=song.currentTime/song.duration*100;
}
};

$("seekBar").oninput=e=>{
if(song.duration){
song.currentTime=e.target.value/100*song.duration;
}
};

// CREATE PLAYLIST

$("playlistForm").onsubmit=e=>{
e.preventDefault();

let name=$("playlistName").value.trim();
if(!name)return;

if(Object.prototype.hasOwnProperty.call(playlists,name)){
alert("Playlist already exists!");
return;
}

playlists[name]=[];

$("playlistName").value="";
saveData();
displayPlaylists();

alert("Playlist created!");
};

// ADD SONG TO PLAYLIST

function addToPlaylist(id){
let name=$("playlistSelect").value;

if(!name)return alert("First create and select a playlist!");

if(playlists[name].includes(id))
return alert("Song already added!");

playlists[name].push(id);

saveData();
displayPlaylists();

alert("Song added successfully!");
}

// DISPLAY PLAYLISTS

function displayPlaylists(){
let select=$("playlistSelect");
let old=select.value;

select.innerHTML='<option value="">Select a playlist</option>';

Object.keys(playlists).forEach(name=>{
select.add(new Option(name,name));
});

if(playlists[old])select.value=old;

$("playlistContainer").innerHTML=Object.keys(playlists).length?
Object.entries(playlists).map(([name,ids])=>`
<div class="playlist-item">
<h3>🎵 ${name}</h3>
<p>${ids.length} Songs</p>

<button onclick="deletePlaylist('${name}')">Delete Playlist</button>

${ids.map(id=>{
let s=songs.find(x=>x.id===id);

return s?`
<div style="margin-top:12px">
<span>🎧 ${s.title} - ${s.artist}</span>
<button onclick="playSong('${id}')">▶ Play</button>
<button onclick="removeSong('${name}','${id}')">Remove</button>
</div>`:"";
}).join("")}

</div>
`).join("")
:'<p class="empty-message">Create your first playlist!</p>';
}

// DELETE PLAYLIST

function deletePlaylist(name){
if(confirm("Delete playlist "+name+"?")){
delete playlists[name];
saveData();
displayPlaylists();
}
}

// REMOVE SONG

function removeSong(name,id){
playlists[name]=playlists[name].filter(x=>x!==id);
saveData();
displayPlaylists();
}

// SEARCH SONGS

$("searchInput").oninput=e=>{
let search=e.target.value.toLowerCase();

let filtered=currentList.filter(s=>
(s.title+" "+s.artist).toLowerCase().includes(search)
);

displaySongCards(filtered);
};

// START WEBSITE

displayArtists();
displaySongCards(currentList);
displayFavorites();
displayPlaylists();

song.volume=1;
updateVolume();
