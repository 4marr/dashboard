const apiURL = "https://latipharkat-api.my.id/api/otakudesu/";

var loader = document.getElementById("loader");
var loadingAnime = document.getElementById("listContainerComplete");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

document
  .getElementById("search-anime")
  .addEventListener("keypress", (event) => {
    let value = document.getElementById("search-anime").value;
    if (event.key === "Enter") {
          window.location.href = `searchanime.html?anime-search=${value}`
          loader.style.display = "flex";
      
    }
  });

fetch(`${apiURL}genres`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    for (var i = 0; i < data.data.length; i++) {
      let genre = data.data[i].name;
      let genreId = data.data[i].data;

      var li = document.createElement("li");
      li.classList.add("list-genre");

      var divGenre = document.createElement("div");
      divGenre.classList.add("div-genre-anime");
      var genreName = document.createElement("p");
      genreName.classList.add("genre-anime");
      genreName.innerHTML = genre;
      divGenre.append(genreName)
      var div1 = document.createElement("div");
      var button = document.createElement("button");
      button.classList.add("get-info-genre");

      div1.classList.add("get-info-genre");
      div1.append(button);

      button.style.fontSize = "0px";
      button.append(i);

      li.append(div1);
      li.append(divGenre)
      listGenreAnime.append(li);

      // Download Button Event

      button.addEventListener("click", function (event) {
        window.location.href = `animegenres.html?anime-genres=${genreId}`
        console.log(`Anime name: ${anime}`);
        console.log(`Anime ID: ${animeId}`);
        loader.style.display = "flex";
      });
    }
  })

fetch(`${apiURL}ongoing`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    for (var i = 0; i < data.data.data_anime.length; i++) {
      let anime = data.data.data_anime[i].judul;
      let animeId = data.data.data_anime[i].data;
      let release = data.data.data_anime[i].release_on_every;
      let coverImg = data.data.data_anime[i].cover;
      let episode = data.data.data_anime[i].episode;

      var li = document.createElement("li");
      li.classList.add("list");
      var divCover = document.createElement("div");
      divCover.classList.add("cover");
      var img = document.createElement("img");
      img.classList.add("img-el");
      img.setAttribute("src", coverImg);
      var dayRelease = document.createElement("p");
      dayRelease.classList.add("day-release");
      dayRelease.innerHTML = release;
      var episodeAnime = document.createElement("p");
      episodeAnime.classList.add("total-episode-now");
      episodeAnime.innerHTML = episode;
      divCover.append(img);
      divCover.append(dayRelease);
      divCover.append(episodeAnime);

      var divJudul = document.createElement("div");
      divJudul.classList.add("anime-info");
      var judulAnime = document.createElement("p");
      judulAnime.classList.add("judul-anime");
      const maxLength = 20; // Batas jumlah karakter
      if (anime.length > maxLength) {
        let truncatedText = anime.substring(0, maxLength - 1) + "...";
        judulAnime.innerText = truncatedText;
      } else {
        judulAnime.innerText = anime;
      }
      divJudul.append(judulAnime);

      var div1 = document.createElement("div");
      var button = document.createElement("button");
      button.classList.add("get-info");

      div1.classList.add("get-info-anime");
      div1.append(button);

      button.style.fontSize = "0px";
      button.append(i);

      li.append(div1);
      li.append(divCover);
      li.append(divJudul);
      listContainerOngoing.append(li);

      // Download Button Event

      button.addEventListener("click", function (event) {
        window.location.href = `detailanime.html?anime=${animeId}`
        console.log(`Anime name: ${anime}`);
        console.log(`Anime ID: ${animeId}`);
        loader.style.display = "flex";
      });
    }
  });

fetch(`${apiURL}complete`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    for (var i = 0; i < data.data.data_anime.length; i++) {
      let anime = data.data.data_anime[i].judul;
      let animeId = data.data.data_anime[i].data;
      let release = data.data.data_anime[i].release_on_every;
      let coverImg = data.data.data_anime[i].cover;
      let episode = data.data.data_anime[i].episode;

      var li = document.createElement("li");
      li.classList.add("list");
      var divCover = document.createElement("div");
      divCover.classList.add("cover");
      var img = document.createElement("img");
      img.classList.add("img-el");
      img.setAttribute("src", coverImg);
      var dayRelease = document.createElement("p");
      dayRelease.classList.add("day-release");
      dayRelease.innerHTML = release;
      var episodeAnime = document.createElement("p");
      episodeAnime.classList.add("total-episode-now");
      episodeAnime.innerHTML = episode;
      divCover.append(img);
      divCover.append(dayRelease);
      divCover.append(episodeAnime);

      var divJudul = document.createElement("div");
      divJudul.classList.add("anime-info");
      var judulAnime = document.createElement("p");
      judulAnime.classList.add("judul-anime");
      const maxLength = 20; // Batas jumlah karakter
      if (anime.length > maxLength) {
        let truncatedText = anime.substring(0, maxLength - 1) + "...";
        judulAnime.innerText = truncatedText;
      } else {
        judulAnime.innerText = anime;
      }
      divJudul.append(judulAnime);

      var div1 = document.createElement("div");
      var button = document.createElement("button");
      button.classList.add("get-info");

      div1.classList.add("get-info-anime");
      div1.append(button);

      button.style.fontSize = "0px";
      button.append(i);

      li.append(div1);
      li.append(divCover);
      li.append(divJudul);
      listContainerComplete.append(li);

      // Download Button Event

      button.addEventListener("click", function (event) {
        window.location.href = `detailanime.html?anime=${animeId}`
        console.log(`Anime name: ${anime}`);
        console.log(`Anime ID: ${animeId}`);
        loader.style.display = "flex";
      });
    }
  });

function home() {
  window.location.reload();
}