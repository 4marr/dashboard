var loader = document.getElementById("loader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

var api = "https://api.alif.my.id/alquran";
var surahAPI = "https://api.quran.gading.dev/surah/"

fetch(api)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.surats.length; i++) {
      let suratsId = data.surats[i].id;
      let suratsName = data.surats[i].surat_name;
      let suratsTerjemahan = data.surats[i].surat_terjemahan
      let suratText = data.surats[i].surat_text;
      let typeSurats = data.surats[i].type;
      let countAyat = data.surats[i].count_ayat;

      var li = document.createElement("li");
      li.classList.add("list-surats");

      var divJudul = document.createElement("div");
      divJudul.classList.add("surats-info");
      var namaAyat = document.createElement("p");
      namaAyat.classList.add("nama-surat");
      namaAyat.innerHTML = suratsName;
      var divSubJudul = document.createElement("div");
      divSubJudul.classList.add("surats-more-info");
      var terjemahanSurat = document.createElement("p");
      terjemahanSurat.classList.add("terjemahan-surat");
      terjemahanSurat.innerHTML = suratsTerjemahan + " • " + countAyat + " Ayat";

      var divType = document.createElement("div");
      divType.classList.add("div-tipe-surat");
      var divAngka = document.createElement("div");
      divAngka.classList.add("div-angka-surats");
      var angkaSurat = document.createElement("p");
      angkaSurat.classList.add("angka-surat");
      angkaSurat.innerHTML = suratsId;
      var divtypeSurat = document.createElement("div")
      divtypeSurat.classList.add("types-surat");
      var tipeSurat = document.createElement("p");
      tipeSurat.classList.add("tipe-surat");
      tipeSurat.innerHTML = typeSurats;
      if (typeSurats == "Makkiyyah") {
        tipeSurat.classList.add("makkiyyah")
      } else {
        tipeSurat.classList.add("madaniyyah")
      }

      var divArab = document.createElement("div");
      divArab.classList.add("surats-arab");
      var arabAyat = document.createElement("div");
      arabAyat.innerHTML = suratText;
      arabAyat.classList.add("arab-surat");
      arabAyat.classList.add("arab");

      divJudul.append(namaAyat);
      divSubJudul.append(terjemahanSurat);
      divJudul.append(divSubJudul);
      divArab.append(arabAyat);
      divAngka.append(angkaSurat);
      divtypeSurat.append(tipeSurat);
      divType.append(divAngka);
      divType.append(divtypeSurat);


      var div1 = document.createElement("div");
      var button = document.createElement("button");
      button.classList.add("get-info");

      div1.classList.add("get-info-surat");
      div1.append(button);

      button.style.fontSize = "0px";
      button.append(i);

      var divCont = document.createElement("div");
      divCont.classList.add("div-container");
      listContainerSearch.append(div1);
      li.append(divJudul);
      li.append(divArab);
      divJudul.append(divType);
      divCont.append(div1)
      divCont.append(li)
      listContainerSearch.append(divCont);

      // Download Button Event

      button.addEventListener("click", function (event) {
        loader.style.display = "flex";
        document.getElementById("listContainerSearch").innerHTML = ""
        async function fetchData() {
          let ContainerAyat = "";
          console.log(ContainerAyat)

          try {
            let response1 = await fetch(`${api}/${suratsId}`);
            let data1 = await response1.json();
            console.log(data1)

            let response2 = await fetch(`${surahAPI}${suratsId}`);
            let data2 = await response2.json();
            console.log(data2)

            var nama_surat = data2.data.name.transliteration.id;
            var nama_surat_terjemahan = data2.data.name.translation.id;
            var jumlah_ayat = data2.data.numberOfVerses;
            var nomor_surat = data2.data.number;
            var tipe_surat = data2.data.revelation.id;
            var nama_surat_arab = data2.data.name.long;
            var arab_bismilah = data2.data.preBismillah;
            var divJudul = document.getElementById("div-judul");
            var divControls = document.getElementById("div-controls");
            var divBismillah = document.getElementById("div-bismillah");
            divJudul.innerHTML = `
            <div class="surats-info-lanjutan">
              <p class="nama-surat">Surah ${nama_surat}</p>
              <p class="terjemahan-surat">${nama_surat_terjemahan} • ${jumlah_ayat} Ayat</p>
              <div class="div-tipe-angka-surat-lanjutan">
                <div class="types-surat-lanjutan">
                  <p class="tipe-surat ${tipe_surat}">${tipe_surat}</p>
                </div>
              </div>
            </div>
            <p class="arab">${nama_surat_arab}</p>
            `
            // divControls.innerHTML = `
            // <div class="controls-tafsir">
            //   <button id="toggleTafsir">
            //       <i class='bx bx-book-content'></i>
            //       Tampilkan Tafsir
            //   </button>
            // </div>
            // `
            if (arab_bismilah === null) {
              divBismillah.innerHTML = ''
            } else {
              divBismillah.innerHTML = `
            <div class="container-bismillah">
              <p class="arab-bismillah">${arab_bismilah.text.arab}</p>
              <p class="latin-bismillah">${arab_bismilah.text.transliteration.en}</p>
              <p class="terjemahan-bismillah">${arab_bismilah.translation.id}</p>
            </div>
            `
            }

            data1.ayats.forEach((item, index) => {
              ContainerAyat += `
            <li class="list-ayat" id="list-ayat">
              <div class="container-ayat">
                <p class="ayat-arab">${item.aya_text}</p>
                <audio controls>
                  <source src="${data2.data.verses[index].audio.primary}"></source>
                    mohon maaf, browser anda tidak support format audio ini
                </audio>
                <p class="ayat-latin">${data2.data.verses[index].number.inSurah}. ${data2.data.verses[index].text.transliteration.en}</p>
                <p class="ayat-terjemahann">${data2.data.verses[index].translation.id}</p>
                <div class="div-more" id="div-more">
                    <p class="ayat-juz">Ayat ini termasuk kedalam <span class="text-bold">Juz ke-${data2.data.verses[index].meta.juz}</span> dalam Al-Qur'an</p>
                    <p class="ayat-tafsir">${data2.data.verses[index].tafsir.id.short}</p>
                </div>
              </div>
            </li>`;
            });
            document.getElementById('listContainerSurah').innerHTML = ContainerAyat;
          } catch {
            console.log(error)
          } finally {
            console.log("sukses")
            loader.style.display = "none";
            document.querySelector(".bx-arrow-back").style.display = "flex";
          }
        }
        fetchData();
      });
    }
  });

function refresh() {
  window.location.reload();
}