let model1 = document.getElementById("model1");
let model2 = document.getElementById("model2");
let generateAnime = document.getElementById("generateAnime");
let generate3d = document.getElementById("generateReal");

model1.addEventListener("click", function() {
    model1.classList.add("active");
    model2.classList.remove("active");
    generateAnime.classList.add("tampil");
    generate3d.classList.remove("tampil");
});
model2.addEventListener("click", function() {
    model2.classList.add("active");
    model1.classList.remove("active");
    generate3d.classList.add("tampil");
    generateAnime.classList.remove("tampil");
});

var textarea = document.getElementById('prompt');
textarea.addEventListener("input", e => {
    textarea.style.height = "50px";
    var height = e.target.scrollHeight;
    textarea.style.height = height + 'px';

    if (height > 55) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
});

let api = "https://api.nyxs.pw/ai-image/image-generator?prompt="

function generateAnimeh() {
    async function getImage() {
        let prompt = document.getElementById("prompt").value;
        let image = "";
        let download = "";
        document.getElementById("generateAnime").innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        try {
            let response = await fetch(`${api}${encodeURIComponent(prompt)}&model=jugger&style=anime`);
            let data = await response.blob()
            const imageURL = URL.createObjectURL(data);
            image += `
            <img src="${imageURL}" alt="gambar">
            `;
            download += `
            <a href="${imageURL}" download="gambar-ai.jpg">Download</a>
            `;
            console.log(imageURL);
            console.log(prompt);

            document.getElementById("container-image").innerHTML = image;
            document.getElementById("container-download").innerHTML = download;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log("sukses");
            document.getElementById("generateAnime").innerHTML = "Generate Again";
        }
    }
    getImage()
}

function generateReal() {
    async function getImage() {
        let prompt = document.getElementById("prompt").value;
        let image = "";
        let download = "";
        document.getElementById("generateReal").innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        try {
            let response = await fetch(`${api}${encodeURIComponent(prompt)}&model=jugger&style=3d-model`);
            let data = await response.blob()
            const imageURL = URL.createObjectURL(data);
            image += `
            <img src="${imageURL}" alt="gambar">
            `;
            download += `
            <a href="${imageURL}" download="gambar-ai.jpg">Download</a>
            `;
            console.log(imageURL);
            console.log(prompt);

            document.getElementById("container-image").innerHTML = image;
            document.getElementById("container-download").innerHTML = download;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log("sukses");
            document.getElementById("generateReal").innerHTML = "Generate Again";
        }
    }
    getImage()
}