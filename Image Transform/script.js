function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append('file', file);

    let response;
    let image;
    document.getElementById('response').innerHTML = `<p>Loading Upload...`;

    fetch('https://itzpire.com/tools/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let url = data.fileInfo.url
            response = `<img src="${url}" alt="file image">`;

            document.getElementById("transform").addEventListener("click", function () {
                document.getElementById('hadeImage').innerHTML = `<p> Loading to transform... </p>`
                let value = document.getElementById("option").value
                let api = "";
                if (value === "disney") {
                    api = "https://api.nyxs.pw/ai-image/jadidisney?url="
                } else if (value === "anime") {
                    api = "https://api.nyxs.pw/ai-image/jadianime?url="
                } else if (value === "ghibli") {
                    api = "https://api.nyxs.pw/ai-image/jadighibli?url="
                } else if (value === "pixel") {
                    api = "https://api.nyxs.pw/ai-image/jadipixel?url="
                } else if (value === "dreamscape") {
                    api = "https://api.nyxs.pw/ai-image/jadidreamscape?url="
                } else if (value === "comic") {
                    api = "https://api.nyxs.pw/ai-image/jadicomic?url="
                } else if (value === "cyberpunk") {
                    api = "https://api.nyxs.pw/ai-image/jadicyberpunk?url="
                } else {
                    api = "https://api.nyxs.pw/ai-image/jadiloli?url="
                }
                    fetch(`${api}${url}`)
                    .then(response => response.json())
                    .then(data => {
                        const imageURL = data.result;
                        function generateRandomString(length) {
                            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            let result = '';

                            for (let i = 0; i < length; i++) {
                                const randomIndex = Math.floor(Math.random() * characters.length);
                                result += characters.charAt(randomIndex);
                            }

                            return result;
                        }

                        const randomString = generateRandomString(10);
                        image = `
                        <img src="${imageURL}" alt="gambar">
                        <a href="${imageURL}" download="${randomString}.jpg">Download</a>
                        `;
                        document.getElementById('hadeImage').innerHTML = image;
                    })
                    .catch(error => {
                        response += `<p>Terjadi error, pastikan format file berupa gambar</p>`;
                        console.log(error)
                    })
            })
            document.getElementById('response').innerHTML = response;
        })
        .catch(error => {
            response += `<p> Terjadi kesalahan saat mengupload file </p>`;
            console.log(error)
        })
        .finally(() => {
            document.getElementById("transform").style.display = "flex";
        }
        );
}
