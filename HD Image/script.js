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

            document.getElementById("hadeinDong").addEventListener("click", function () {
                document.getElementById('hadeImage').innerHTML = `<p> Loading lagi ngehadein bang... </p>`
                fetch(`https://api.ryzendesu.vip/api/ai/remini?url=${url}&method=Enhance`)
                    .then(response => response.blob())
                    .then(data => {
                        const imageURL = URL.createObjectURL(data);
                        image = `
                        <img src="${imageURL}" alt="gambar">
                        <a href="${imageURL}" download="gambar-ai.jpg">Download</a>
                        `;
                        document.getElementById('hadeImage').innerHTML = image;
                    })
                    .catch(error => {
                        response += `<p> Banyak yang lagi nge-hadein gambar jadi error, pencet lagi tombolnya</p>`;
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
            document.getElementById("hadeinDong").style.display = "flex";
        }
        );
}