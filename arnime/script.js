const apiURL = "https://latipharkat-api.my.id/api/otakudesu/";

var loader = document.getElementById("loader");
var loadingAnime = document.getElementById("listContainerComplete");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

document
  .getElementById("search-anime")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      let value = document.getElementById("search-anime").value;
      document.getElementById("listContainerSearch").innerHTML = "";
      document.getElementById("container-anime").innerHTML = "";
      document.getElementById("container-stream").innerHTML = "";
      document.getElementById("containerListEpisode").innerHTML = "";
      fetch(`${apiURL}search/?keyword=${encodeURIComponent(value)}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(value);
          document.getElementById("list-anime").style.display = "none";
          for (var i = 0; i < data.data.data.length; i++) {
            let coverImg = data.data.data[i].cover;
            let anime = data.data.data[i].judul;
            let animeId = data.data.data[i].data;
            let genreAnime = data.data.data[i].genres;
            let ratingAnime = data.data.data[i].rating;

            var li = document.createElement("li");
            li.classList.add("list-search");
            var divCover = document.createElement("div");
            divCover.classList.add("cover-search");
            var img = document.createElement("img");
            img.classList.add("img-el-search");
            img.setAttribute("src", coverImg);
            divCover.append(img);

            var divJudul = document.createElement("div");
            divJudul.classList.add("anime-info-search");
            var judulAnime = document.createElement("p");
            judulAnime.innerHTML = anime;
            judulAnime.classList.add("judul-anime-search");
            var genreAnimeSearch = document.createElement("p");
            genreAnimeSearch.classList.add("genre-anime-search");
            const maxLength = 35; // Batas jumlah karakter
            if (genreAnime.length > maxLength) {
              let truncatedText =
                genreAnime.substring(0, maxLength - 1) + "...";
              genreAnimeSearch.innerText = truncatedText;
            } else {
              genreAnimeSearch.innerHTML = genreAnime;
            }

            var ratingAnimeSearch = document.createElement("p");
            ratingAnimeSearch.classList.add("rating-anime-search");
            ratingAnimeSearch.innerHTML = ratingAnime;
            divJudul.append(judulAnime);
            divJudul.append(genreAnimeSearch);
            divJudul.append(ratingAnimeSearch);

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
            listContainerSearch.append(li);

            // Download Button Event

            button.addEventListener("click", function (event) {
              console.log(`Anime name: ${anime}`);
              console.log(`Anime ID: ${animeId}`);

              fetch(`${apiURL}info/?data=${animeId}`, {
                headers: { accept: "application/json" },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                  data = data;
                  document.getElementById("list-anime").innerHTML = "";
                  document.getElementById("cover-ads").innerHTML = "";
                  document.getElementById("listContainerSearch").innerHTML = "";
                  let containerAnime =
                    document.getElementById("container-anime");
                  containerAnime.innerHTML = `
                      <div class="cover-info">
                        <img src="${data.data.cover}" alt="${data.data.cover}" id="cover">
                        <div class="more-info">
                          <h2>${data.data.judul}(${data.data.japanese})</h2>
                          <p>Genres : ${data.data.genre}</p>
                          <p>Producer : ${data.data.produser}</p>
                          <p>Studio : ${data.data.studio}</p>
                          <p>Score : ${data.data.skor}</p>
                          <p>Duration : ${data.data.durasi}</p>
                        </div>
                      </div>
                      ${data.data.sinopsis}
                      
                      `;
                  for (var j = 0; j < data.data.data_episode.length; j++) {
                    let dataEpisode = data.data.data_episode[j].data;
                    let judulEpisodeAnime =
                      data.data.data_episode[j].judul_episode;

                    var liEps = document.createElement("li");
                    liEps.classList.add("list-episode");
                    var divJudulEpisode = document.createElement("div");
                    divJudulEpisode.classList.add("div-judul-episode");
                    var judulEpisode = document.createElement("p");
                    judulEpisode.classList.add("judul-episode");
                    judulEpisode.innerHTML = judulEpisodeAnime;

                    var div2 = document.createElement("div");
                    var button2 = document.createElement("button");
                    button2.classList.add("data-info-episode");

                    div2.classList.add("get-info-episode");
                    div2.append(button2);

                    divJudulEpisode.append(button2);
                    divJudulEpisode.append(judulEpisode);
                    liEps.append(divJudulEpisode);
                    containerListEpisode.append(liEps);

                    button2.addEventListener("click", function (e) {
                      fetch(`${apiURL}view/?data=${dataEpisode}`, {
                        headers: { accept: "application/json" },
                      })
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          console.log(data);
                          data = data;
                          document.getElementById("container-anime").innerHTML =
                            "";
                          document.getElementById(
                            "listContainerSearch"
                          ).innerHTML = "";
                          let containerStream =
                            document.getElementById("container-stream");
                          containerStream.innerHTML = `
                      <div class="stream-info">
                        <iframe src="${data.data.stream}" frameborder="0" allowfullscreen></iframe>
                        <div class="more-info">
                          <h2>${data.data.judul_episode}</h2>
                          <P> Tips : Saat pertama kali anda menonton anime, anda akan melihat iklan judi online, anda bisa langsung menekean tombol close atau jika anda lansung memasuki link judi online tersebut anda bisa menekan tombol kembali pada handphone anda. Mohon maaf atas kendala iklannya karena itu berasal dari server otakudesu itu sendiri, saya tidak punya kendalin atas hal itu. Website ini TIDAK DAN TIDAK AKAN PERNAH mensponsori judi online manapun! <br> Selamat menonton!</p> 
                        </div>
                      </div>
                      `;
                        });
                    });
                  }
                });
            });
          }
        });
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
        console.log(`genre name: ${genre}`);
        console.log(`genre ID: ${genreId}`);

        fetch(`${apiURL}genres/${genreId}/`, {
          headers: { accept: "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            data = data;
            document.getElementById("list-anime").innerHTML = "";
            document.getElementById("cover-ads").innerHTML = "";
            document.getElementById("container-genre").innerHTML = "";
            for (var i = 0; i < data.data.data.length; i++) {
              let coverImg = data.data.data[i].cover;
              let anime = data.data.data[i].judul;
              let animeId = data.data.data[i].data;
              let genreAnime = data.data.data[i].genre;
              let ratingAnime = data.data.data[i].total_episode;
  
              var li = document.createElement("li");
              li.classList.add("list-search");
              var divCover = document.createElement("div");
              divCover.classList.add("cover-search");
              var img = document.createElement("img");
              img.classList.add("img-el-search");
              img.setAttribute("src", coverImg);
              divCover.append(img);
  
              var divJudul = document.createElement("div");
              divJudul.classList.add("anime-info-search");
              var judulAnime = document.createElement("p");
              judulAnime.innerHTML = anime;
              judulAnime.classList.add("judul-anime-search");
              var genreAnimeSearch = document.createElement("p");
              genreAnimeSearch.classList.add("genre-anime-search");
              const maxLength = 35; // Batas jumlah karakter
              if (genreAnime.length > maxLength) {
                let truncatedText =
                  genreAnime.substring(0, maxLength - 1) + "...";
                genreAnimeSearch.innerText = truncatedText;
              } else {
                genreAnimeSearch.innerHTML = genreAnime;
              }
  
              var ratingAnimeSearch = document.createElement("p");
              ratingAnimeSearch.classList.add("rating-anime-search");
              ratingAnimeSearch.innerHTML = ratingAnime;
              divJudul.append(judulAnime);
              divJudul.append(genreAnimeSearch);
              divJudul.append(ratingAnimeSearch);
  
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
              listContainerSearch.append(li);
  
              // Download Button Event
  
              button.addEventListener("click", function (event) {
                console.log(`Anime name: ${anime}`);
                console.log(`Anime ID: ${animeId}`);
  
                fetch(`${apiURL}info/?data=${animeId}`, {
                  headers: { accept: "application/json" },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);
                    data = data;
                    document.getElementById("list-anime").innerHTML = "";
                    document.getElementById("cover-ads").innerHTML = "";
                    document.getElementById("listContainerSearch").innerHTML = "";
                    let containerAnime =
                      document.getElementById("container-anime");
                    containerAnime.innerHTML = `
                        <div class="cover-info">
                          <img src="${data.data.cover}" alt="${data.data.cover}" id="cover">
                          <div class="more-info">
                            <h2>${data.data.judul}(${data.data.japanese})</h2>
                            <p>Genres : ${data.data.genre}</p>
                            <p>Producer : ${data.data.produser}</p>
                            <p>Studio : ${data.data.studio}</p>
                            <p>Score : ${data.data.skor}</p>
                            <p>Duration : ${data.data.durasi}</p>
                          </div>
                        </div>
                        ${data.data.sinopsis}
                        
                        `;
                    for (var j = 0; j < data.data.data_episode.length; j++) {
                      let dataEpisode = data.data.data_episode[j].data;
                      let judulEpisodeAnime =
                        data.data.data_episode[j].judul_episode;
  
                      var liEps = document.createElement("li");
                      liEps.classList.add("list-episode");
                      var divJudulEpisode = document.createElement("div");
                      divJudulEpisode.classList.add("div-judul-episode");
                      var judulEpisode = document.createElement("p");
                      judulEpisode.classList.add("judul-episode");
                      judulEpisode.innerHTML = judulEpisodeAnime;
  
                      var div2 = document.createElement("div");
                      var button2 = document.createElement("button");
                      button2.classList.add("data-info-episode");
  
                      div2.classList.add("get-info-episode");
                      div2.append(button2);
  
                      divJudulEpisode.append(button2);
                      divJudulEpisode.append(judulEpisode);
                      liEps.append(divJudulEpisode);
                      containerListEpisode.append(liEps);
  
                      button2.addEventListener("click", function (e) {
                        fetch(`${apiURL}view/?data=${dataEpisode}`, {
                          headers: { accept: "application/json" },
                        })
                          .then((res) => {
                            return res.json();
                          })
                          .then((data) => {
                            console.log(data);
                            data = data;
                            document.getElementById("container-anime").innerHTML =
                              "";
                            document.getElementById(
                              "listContainerSearch"
                            ).innerHTML = "";
                            let containerStream =
                              document.getElementById("container-stream");
                            containerStream.innerHTML = `
                        <div class="stream-info">
                          <iframe src="${data.data.stream}" frameborder="0" allowfullscreen></iframe>
                          <div class="more-info">
                            <h2>${data.data.judul_episode}</h2>
                            <P> Tips : Saat pertama kali anda menonton anime, anda akan melihat iklan judi online, anda bisa langsung menekean tombol close atau jika anda lansung memasuki link judi online tersebut anda bisa menekan tombol kembali pada handphone anda. Mohon maaf atas kendala iklannya karena itu berasal dari server otakudesu itu sendiri, saya tidak punya kendalin atas hal itu. Website ini TIDAK DAN TIDAK AKAN PERNAH mensponsori judi online manapun! <br> Selamat menonton!</p> 
                          </div>
                        </div>
                        `;
                          });
                      });
                    }
                  });
              });
            }
          });
      })
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
        console.log(`Anime name: ${anime}`);
        console.log(`Anime ID: ${animeId}`);

        fetch(`${apiURL}info/?data=${animeId}`, {
          headers: { accept: "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            data = data;
            document.getElementById("list-anime").innerHTML = "";
            document.getElementById("cover-ads").innerHTML = "";
            let containerAnime = document.getElementById("container-anime");
            containerAnime.innerHTML = `
                <div class="cover-info">
                  <img src="${data.data.cover}" alt="${data.data.cover}" id="cover">
                  <div class="more-info">
                    <h2>${data.data.judul}(${data.data.japanese})</h2>
                    <p>Genres : ${data.data.genre}</p>
                    <p>Producer : ${data.data.produser}</p>
                    <p>Studio : ${data.data.studio}</p>
                    <p>Score : ${data.data.skor}</p>
                    <p>Duration : ${data.data.durasi}</p>
                  </div>
                </div>
                ${data.data.sinopsis}
                
                `;
            for (var j = 0; j < data.data.data_episode.length; j++) {
              let dataEpisode = data.data.data_episode[j].data;
              let judulEpisodeAnime = data.data.data_episode[j].judul_episode;

              var liEps = document.createElement("li");
              liEps.classList.add("list-episode");
              var divJudulEpisode = document.createElement("div");
              divJudulEpisode.classList.add("div-judul-episode");
              var judulEpisode = document.createElement("p");
              judulEpisode.classList.add("judul-episode");
              judulEpisode.innerHTML = judulEpisodeAnime;

              var div2 = document.createElement("div");
              var button2 = document.createElement("button");
              button2.classList.add("data-info-episode");

              div2.classList.add("get-info-episode");
              div2.append(button2);

              divJudulEpisode.append(button2);
              divJudulEpisode.append(judulEpisode);
              liEps.append(divJudulEpisode);
              containerListEpisode.append(liEps);

              button2.addEventListener("click", function (e) {
                fetch(`${apiURL}view/?data=${dataEpisode}`, {
                  headers: { accept: "application/json" },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);
                    data = data;
                    document.getElementById("container-anime").innerHTML = "";
                    let containerStream =
                      document.getElementById("container-stream");
                    containerStream.innerHTML = `
                <div class="stream-info">
                  <iframe src="${data.data.stream}" frameborder="0" allowfullscreen></iframe>
                  <div class="more-info">
                    <h2>${data.data.judul_episode}</h2>
                    <P> Tips : Saat pertama kali anda menonton anime, anda akan melihat iklan judi online, anda bisa langsung menekean tombol close atau jika anda lansung memasuki link judi online tersebut anda bisa menekan tombol kembali pada handphone anda. Mohon maaf atas kendala iklannya karena itu berasal dari server otakudesu itu sendiri, saya tidak punya kendalin atas hal itu. Website ini TIDAK DAN TIDAK AKAN PERNAH mensponsori judi online manapun! <br> Selamat menonton!</p> 
                  </div>
                </div>
                `;
                  });
              });
            }
          });
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
        console.log(`Anime name: ${anime}`);
        console.log(`Anime ID: ${animeId}`);

        fetch(`${apiURL}info/?data=${animeId}`, {
          headers: { accept: "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            data = data;
            document.getElementById("list-anime").innerHTML = "";
            document.getElementById("cover-ads").innerHTML = "";
            let containerAnime = document.getElementById("container-anime");
            containerAnime.innerHTML = `
                <div class="cover-info">
                  <img src="${data.data.cover}" alt="${data.data.cover}" id="cover">
                  <div class="more-info">
                    <h2>${data.data.judul}(${data.data.japanese})</h2>
                    <p>Genres : ${data.data.genre}</p>
                    <p>Producer : ${data.data.produser}</p>
                    <p>Studio : ${data.data.studio}</p>
                    <p>Score : ${data.data.skor}</p>
                    <p>Duration : ${data.data.durasi}</p>
                  </div>
                </div>
                ${data.data.sinopsis}
                
                `;
            for (var j = 0; j < data.data.data_episode.length; j++) {
              let dataEpisode = data.data.data_episode[j].data;
              let judulEpisodeAnime = data.data.data_episode[j].judul_episode;

              var liEps = document.createElement("li");
              liEps.classList.add("list-episode");
              var divJudulEpisode = document.createElement("div");
              divJudulEpisode.classList.add("div-judul-episode");
              var judulEpisode = document.createElement("p");
              judulEpisode.classList.add("judul-episode");
              judulEpisode.innerHTML = judulEpisodeAnime;

              var div2 = document.createElement("div");
              var button2 = document.createElement("button");
              button2.classList.add("data-info-episode");

              div2.classList.add("get-info-episode");
              div2.append(button2);

              divJudulEpisode.append(button2);
              divJudulEpisode.append(judulEpisode);
              liEps.append(divJudulEpisode);
              containerListEpisode.append(liEps);

              button2.addEventListener("click", function (e) {
                fetch(`${apiURL}view/?data=${dataEpisode}`, {
                  headers: { accept: "application/json" },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);
                    data = data;
                    document.getElementById("container-anime").innerHTML = "";
                    let containerStream =
                      document.getElementById("container-stream");
                    containerStream.innerHTML = `
                <div class="stream-info">
                  <iframe src="${data.data.stream}" frameborder="0" allowfullscreen></iframe>
                  <div class="more-info">
                    <h2>${data.data.judul_episode}</h2>
                    <P> Tips : Saat pertama kali anda menonton anime, anda akan melihat iklan judi online, anda bisa langsung menekean tombol close atau jika anda lansung memasuki link judi online tersebut anda bisa menekan tombol kembali pada handphone anda. Mohon maaf atas kendala iklannya karena itu berasal dari server otakudesu itu sendiri, saya tidak punya kendalin atas hal itu. Website ini TIDAK DAN TIDAK AKAN PERNAH mensponsori judi online manapun! <br> Selamat menonton!</p> 
                  </div>
                </div>
                `;
                  });
              });
            }
          });
      });
    }
  });

function home() {
  window.location.reload();
}
