let loaderPlaylist = document.getElementById("loaderPlaylist");
window.addEventListener("load", function () {
  loaderPlaylist.style.opacity = "0";
});

var api = "https://api.ryzendesu.vip/api/downloader/spotify";
var apiData = "https://api.mininxd.my.id/spotify";
var searchApi = "https://spotifyapi.caliphdev.com/api/search/tracks"

function fetchPlaylist() {
  var getURL = document.getElementById("url").value;
  var getRL = document.getElementById("url");
  getRL.readOnly = true;
  document.getElementById("fetchPlaylist").innerHTML = "searching...";
  if (getURL.trim() === "") {
    document.getElementById(
      "downloadLinks"
    ).innerHTML = `<p style="color: #ff0000;">Url tidak boleh kosong!</p>`;
    document.getElementById("fetchPlaylist").innerHTML = "search";
    getRL.readOnly = false;
    return;
  } else {
    document.getElementById("downloadLinks").innerHTML = "";
  }
  // const supportedUrls = ["spotify.com/track", "spotify.com/playlist"];
  // if (!supportedUrls.some((supportedUrl) => getURL.includes(supportedUrl))) {
  //   document.getElementById(
  //     "downloadLinks"
  //   ).innerHTML = `<p style="color: #ff0000;">Unsupported URL! Hanya support spotify`;
  //   document.getElementById("fetchPlaylist").innerHTML = "search";
  //   getRL.readOnly = false;
  //   return;
  // }
  
  if (getURL.includes("spotify.com/track")) {
    const sptfyTrack = `https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(
      getURL
    )}`;
    fetch(sptfyTrack)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let downloadLinks = document.getElementById("downloadLinks")
        document.getElementById("fetchPlaylist").innerHTML = "search";
        downloadLinks.innerHTML = `
        <div id="container-track">
        <div id="container-image-track">
                <img src="${data.data.cover}" alt="image_playlist" id="image-track">
                </div>
              <h2>${data.metadata.title}</h2>
              <p id="artist">${data.metadata.artists} </p>
              <div id="container-download-track">
              <a href="${data.metadata.link}" download>Download Musik</a>
              </div>
              </div>
              `;
              const fetchButton = document.getElementById("fetchPlaylist");
              const delButton = document.getElementById("deleteUrl");
        fetchButton.style.display = "none";
        delButton.style.display = "block";
      });
    } else if (getURL.includes("spotify.com/playlist")) {
      fetch(`${apiData}?url=${getURL}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(getURL);
        listContainer.style.padding = "10px 0 10px 0";
        const fetchButton = document.getElementById("fetchPlaylist");
        const delButton = document.getElementById("deleteUrl");
        fetchButton.style.display = "none";
        delButton.style.display = "block";
        
        for (var i = 0; i < data.tracks.items.length; i++) {
          let song = data.tracks.items;
          let songs = data.tracks.items[i].track.name;
          let songId = data.tracks.items[i].track.id;
          let artistName = data.tracks.items[i].track.artists[0].name;
          let albumImg = data.tracks.items[i].track.album.images[1].url;
          
          playlistName.innerHTML = data.name;
          playlistImg.src = data.images[0].url;
          description.innerHTML = data.description;
          display_name.innerHTML = data.owner.display_name;
          display_total.innerHTML = data.tracks.total + " songs";

          var li = document.createElement("li");
          li.classList.add("list");
          var img = document.createElement("img");
          img.classList.add("imgEl");
          img.setAttribute("src", albumImg);
          li.append(img);
          
          var div = document.createElement("div");
          div.classList.add("songInfo");
          var span1 = document.createElement("span");
          var span2 = document.createElement("span");
          span1.classList.add("md-typescale-title-large", "w-600", "songName");
          span1.innerText = songs;
          span2.classList.add("md-typescale-body-medium", "w-400");
          span2.innerHTML = "<br>" + artistName;
          div.append(span1);
          div.appendChild(span2);
          
          var a = document.createElement("a");
          var div1 = document.createElement("div");
          var button = document.createElement("button");
          var button2 = document.createElement("button");
          button.classList.add("button");
          button2.classList.add("button", `download${i}`);
          var mdFillBtn = document.createElement("md-filled-button");
          var mdFillBtn2 = document.createElement("md-filled-button");

          var span_btn1 = document.createElement("span");
          var span_btn2 = document.createElement("span");
          a.setAttribute("href", "url.html");
          div1.classList.add("downloadBtn");
          span_btn1.classList.add("material-icons");
          span_btn2.classList.add("material-icons");
          span_btn1.innerHTML = "download";
          span_btn2.innerHTML = "check";
          div1.append(button);
          div1.append(button2);
          button.append(mdFillBtn);
          button2.append(mdFillBtn2);
          mdFillBtn.append(span_btn1);
          mdFillBtn2.append(span_btn2);

          button.style.fontSize = "0px";
          button.append(i);
          button2.style.transform = "scale(0.0001)";
          
          li.append(div1);
          li.append(div);
          listContainer.append(li);
          
          // Download Button Event
          button.addEventListener("click", function (event) {
            console.log(`Song name: ${songs}`);
            console.log(`Song ID: ${songId}`);
            
            this.disabled = true;
            let btn2 = document.querySelector(`.${this.textContent}`);
            
            this.innerHTML = `<md-filled-button>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </md-filled-button>`;
            
            fetch(`${api}?url=https://open.spotify.com/track/${songId}`, {
              headers: { accept: "application/json" },
            })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
                this.style.display = "none";
                btn2.style.transform = "scale(1)";
                console.log(data);

                btn2.addEventListener("click", function () {
                  window.open(data.metadata.link).focus();
                });
              });
            });
          }
      })
      .catch((e) => {
        console.log(e);
        getRL.readOnly = false;
      });
    } else {
      fetch(`${searchApi}?q=${getURL}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(getURL);
        listContainer.style.padding = "10px 0 10px 0";
        const fetchButton = document.getElementById("fetchPlaylist");
        const delButton = document.getElementById("deleteUrl");
        fetchButton.style.display = "none";
        delButton.style.display = "block";
        document.getElementById("playlistTop").style.display = "none";
        
        for (var i = 0; i < data.length; i++) {
          let song = data;
          let songs = data[i].title;
          let songId = data[i].id;
          let artistName = data[i].artist;
          let albumImg = data[i].thumbnail;
          
          var li = document.createElement("li");
          li.classList.add("list");
          var img = document.createElement("img");
          img.classList.add("imgEl");
          img.setAttribute("src", albumImg);
          li.append(img);
          
          var div = document.createElement("div");
          div.classList.add("songInfo");
          var span1 = document.createElement("span");
          var span2 = document.createElement("span");
          span1.classList.add("md-typescale-title-large", "w-600", "songName");
          span1.innerText = songs;
          span2.classList.add("md-typescale-body-medium", "w-400");
          span2.innerHTML = "<br>" + artistName;
          div.append(span1);
          div.appendChild(span2);
          
          var a = document.createElement("a");
          var div1 = document.createElement("div");
          var button = document.createElement("button");
          var button2 = document.createElement("button");
          button.classList.add("button");
          button2.classList.add("button", `download${i}`);
          var mdFillBtn = document.createElement("md-filled-button");
          var mdFillBtn2 = document.createElement("md-filled-button");

          var span_btn1 = document.createElement("span");
          var span_btn2 = document.createElement("span");
          a.setAttribute("href", "url.html");
          div1.classList.add("downloadBtn");
          span_btn1.classList.add("material-icons");
          span_btn2.classList.add("material-icons");
          span_btn1.innerHTML = "download";
          span_btn2.innerHTML = "check";
          div1.append(button);
          div1.append(button2);
          button.append(mdFillBtn);
          button2.append(mdFillBtn2);
          mdFillBtn.append(span_btn1);
          mdFillBtn2.append(span_btn2);

          button.style.fontSize = "0px";
          button.append(i);
          button2.style.transform = "scale(0.0001)";
          
          li.append(div1);
          li.append(div);
          listContainer.append(li);
          
          // Download Button Event
          button.addEventListener("click", function (event) {
            console.log(`Song name: ${songs}`);
            console.log(`Song ID: ${songId}`);
            
            this.disabled = true;
            let btn2 = document.querySelector(`.${this.textContent}`);
            
            this.innerHTML = `<md-filled-button>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </md-filled-button>`;
            
            fetch(`${api}?url=https://open.spotify.com/track/${songId}`, {
              headers: { accept: "application/json" },
            })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
                this.style.display = "none";
                btn2.style.transform = "scale(1)";
                console.log(data);

                btn2.addEventListener("click", function () {
                  window.open(data.data.download).focus();
                });
              });
            });
          }
      })
      .catch((e) => {
        console.log(e);
        getRL.readOnly = false;
      });
    }
}

function deleteUrl() {
  window.location.reload()
}

function getValue() {
  const fetchButton = document.getElementById("fetchPlaylist");
  const delButton = document.getElementById("deleteUrl");
  fetchButton.style.display = "block";
  delButton.style.display = "none";
  document.getElementById("fetchPlaylist").innerHTML = "search";
}
