const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx-menu-alt-left");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
    "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
    "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
            searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
            searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
    }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});

const apiURL = "https://itzpire.com/information/news-indonesia/antara/terbaru";

fetch(apiURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById("loadNews").style.display = "none";
        for (var i = 0; i < data.data.posts.length; i++) {
            let coverImg = data.data.posts[i].thumbnail;
            let judul = data.data.posts[i].title;
            let deskripsi = data.data.posts[i].description;
            let tanggal = data.data.posts[i].pubDate;
            let link = data.data.posts[i].link;
            var li = document.createElement("li");
            li.classList.add("list-berita");
            var divCover = document.createElement("div");
            divCover.classList.add("cover-berita");
            var img = document.createElement("img");
            img.classList.add("img-el");
            img.setAttribute("src", coverImg);
            divCover.append(img);
            var divJudul = document.createElement("div");
            divJudul.classList.add("berita-info");
            var judulAnime = document.createElement("p");
            judulAnime.innerHTML = judul;
            judulAnime.classList.add("judul-berita");
            var genreAnimeSearch = document.createElement("p");
            genreAnimeSearch.classList.add("deskripsi");
            const maxLength = 100; // Batas jumlah karakter
            if (deskripsi.length > maxLength) {
                let truncatedText = deskripsi.substring(0, maxLength - 1) + "...";
                genreAnimeSearch.innerText = truncatedText;
            } else {
                genreAnimeSearch.innerHTML = deskripsi;
            }
            var linkBerita = document.createElement("a");
            linkBerita.classList.add("linkBerita");
            linkBerita.href = link
            linkBerita.innerHTML = "Pelajari Selengkapnya"

            divJudul.append(judulAnime);
            divJudul.append(genreAnimeSearch);
            genreAnimeSearch.append(linkBerita);
            li.append(divCover);
            li.append(divJudul);
            portalBerita.append(li);
        }
    }).catch((error) => {
        document.getElementById("loadQuake").innerHTML = "Gagal memuat berita";
    })

const apiGempa = "https://itzpire.com/information/gempaWarning";
fetch(apiGempa)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById("loadQuake").style.display = "none";
        let container = document.getElementById("portalGempa");
        let containGempa = "";

        containGempa += `
            <img src="${data.data.linkPeta}" alt="peta gempa" class="img_eel">
						<div class="desc-gempa">
							<p class="tanggal">${data.data.tanggal}</p>
							<p class="magnitudo"><strong>${data.data.magnitudo} magnitudo. Kedalaman ${data.data.kedalaman}</strong></p>
							<p class="wilayah"><strong>Wilayah yang merasakan:</strong> ${data.data.wilayahDirasakan}</p>
							<p class="lokasi">${data.data.lokasi}</p>
							<p class="arahan">${data.data.arahan}. ${data.data.saran}</p>
						</div>
    `
        container.innerHTML = containGempa;
    }).catch((error) => {
        document.getElementById("loadQuake").innerHTML = "Gagal memuat berita";
    });
