import * as icon from './icon.js';

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx-menu-alt-left');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
})





if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
})

let apiCounter = "https://counterpro.vercel.app/api/count/?id=dashhroad"
fetch(apiCounter)
.then((res) => {
    return res.json();
})
.then((data) => {
    console.log(data);
    let counter = data.count;
    document.getElementById("countVisitors").innerHTML = counter;
})

// clock
function Time() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let gabungan = `${hour}:${minute}:${seconds}`
    document.getElementById("time").innerHTML = gabungan;
}

setInterval(Time, 1)

// wheather
let apiCuaca = "https://api.mininxd.my.id/bmkg/weather/jawaBarat/kotaBogor/bogorSelatan";
fetch(apiCuaca)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data)
        let temperature = data.weatherNow.temperature;
        let weather = data.weatherNow.weather;

        let containerTemp = document.getElementById("temperature");
        let containerWeat = document.getElementById("weather");

        containerTemp.innerHTML = temperature;
        containerWeat.innerHTML = weather;

        let weatherIcon = document.getElementById("weatherIcon");

        if (data.weatherNow.weather.includes('Cerah Berawan')) {
            weatherIcon.innerHTML = icon.CloudSunIcon();
        }
        else if (data.weatherNow.weather.includes('Cerah')) {
            weatherIcon.innerHTML = icon.SunIcon();
        }
        else if (data.weatherNow.weather.includes('Berawan Tebal')) {
            weatherIcon.innerHTML = icon.HeavyCloudIcon();
        }
        else if (data.weatherNow.weather.includes('Berawan')) {
            weatherIcon.innerHTML = icon.CloudIcon();
        }
        else if (data.weatherNow.weather.includes('Hujan')) {
            weatherIcon.innerHTML = icon.CloudRainIcon();
        }
        else if (data.weatherNow.weather.includes('Gerimis')) {
            weatherIcon.innerHTML = icon.CloudDrizzleIcon();
        }
        else if (data.weatherNow.weather.includes('Udara Kabur')) {
            weatherIcon.innerHTML = icon.CloudFogIcon();
        }
        else if (data.weatherNow.weather.includes('Berangin')) {
            weatherIcon.innerHTML = icon.WindIcon();
        }
        else if (data.weatherNow.weather.includes('Kabut')) {
            weatherIcon.innerHTML = icon.FogIcon();
        }
    })
