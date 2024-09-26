var loader = document.getElementById("loader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

var api = "https://api.alif.my.id/alquran";
var surahAPI = "https://api.quran.gading.dev/surah/";

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
        window.location.href = `detailsurah.html?surah=${suratsId}`
        loader.style.display = "flex";
      });
    }
  });