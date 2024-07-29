async function searchVideo() {
    const downloadButton = document.querySelector('button');
    downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.getElementById('downloadLinks').style.display = "inline-block";
    document.getElementById('downloadLinks').innerHTML = "";

    try {
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        const randomString = generateRandomString(8);
        const url = document.getElementById('urlSosmed').value;
        if (url.trim() === '') {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Url tidak boleh kosong!</p>`;
            return;
        }
        //const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
        const supportedUrls = ['instagram.com', 'tiktok.com', /*'facebook.com', 'fb.watch', 'reel', 'spotify.com',*/ 'youtu.be'];

        if (!supportedUrls.some(supportedUrl => url.includes(supportedUrl))) {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Unsupported URL! Hanya support tt/ig/yt</p>`;
            return;
        }

        const ig = `https://itzpire.com/download/instagram?url=${encodeURIComponent(url)}`;
        const tt = `https://itzpire.com/download/tiktok?url=${encodeURIComponent(url)}&type=v2`;
        //const yt = `https://api.nyxs.pw/dl/yt?url=${encodeURIComponent(url)}`;
        const yt = `https://api.nyxs.pw/dl/yt?url=${encodeURIComponent(url)}`
        const fb = `https://itzpire.com/download/facebook?url=${encodeURIComponent(url)}`;
        const sptfy = `https://itzpire.com/download/spotify?url=${encodeURIComponent(url)}`

        let response, data;
        let downloadLinks = '';  // Initialize downloadLinks

        if (url.includes('instagram.com')) {
            response = await fetch(ig);
            data = await response.json();
            downloadButton.style.display = "none";
            downloadLinks += `<a href="${data.data}" download>Download</a>`;
            /*data.data.forEach((item, index) => {
                downloadLinks += `<a href="${item}" download>Download File ${index + 1}</a>`;
            });*/
        } else if (url.includes('tiktok.com')) {
            response = await fetch(tt);
            data = await response.json();
            downloadButton.style.display = "none";

            if (data.data.type === 'image') {
                downloadLinks += `<p>${data.data.desc} │ ${data.data.author.nickname}</p>`;
                data.data.images.forEach((imageUrl, index) => {
                    downloadLinks += `
                    <div id="cnainer-dwnlad">
                    <img src="${imageUrl}" alt="image_file" id="image-file">
                    <a href="${imageUrl}" download>Download Image ${index + 1}</a>
                    </div>
                    `;
                });
                downloadLinks += `<a href="${data.data.music}" target="_blank" download>Download Music Audio</a>`;
            } else {
                downloadLinks += `<p>${data.data.desc} │ ${data.data.author.nickname}</p>`;
                downloadLinks += `
                    <a href="${data.data.video}" target="_blank" download>Download Video</a>
                    <a href="${data.data.music}" target="_blank" download>Download Music Audio</a>
                `;
            }
        } /*else if (youtubeRegex.test(url)) {
            response = await fetch(yt);
            data = await response.json();
            
            const { title, data: ytData } = data.result;
            downloadLinks = `<p>Karena limitasi server, Download YT harus menggunakan Bot WA. hanya tinggal klik tombol dibawah akan menuju ke nomor bot WA.<br><br>${title}</p>`;
            
            if (ytData.fhd) {
                downloadLinks += `<a href="https://wa.me/6285143582588?text=.ytdl%20${url}%20fhd" target="_blank"> Download Video FHD (1080p)<br>Size FHD: ${ytData.fhd.size}</a>`;
                }
                if (ytData.hd) {
                    downloadLinks += `<a href="https://wa.me/6285143582588?text=.ytdl%20${url}%20hd" target="_blank"> Download Video HD (720p)<br>Size HD: ${ytData.hd.size}</a>`;
                    }
                    if (ytData.sd) {
                        downloadLinks += `<a href="https://wa.me/6285143582588?text=.ytdl%20${url}%20sd" target="_blank"> Download Video SD (480p)<br>Size SD: ${ytData.sd.size}</a>`;
                        }
                        if (ytData.mp3) {
                            downloadLinks += `<a href="https://wa.me/6285143582588?text=.ytmp3%20${url}%20" target="_blank"> Download Audio (mp3)<br>Size MP3: ${ytData.mp3.size}</a>`;
                            }
                            }*/ /*else if (/(reel|fb|facebook\.com|fb\.watch)/i.test(url)) {
                                response = await fetch(fb);
            data = await response.json();
            downloadButton.style.display = "none";
            
            const { hd, sd } = data.data;
            
            if (hd) {
                downloadLinks += `<a href="${hd}" download>Download Video HD</a>`;
            }
            if (sd) {
                downloadLinks += `<a href="${sd}" download>Download Video SD</a>`;
            }
        
        }*/ /*else if (url.includes('spotify.com')) {
            response = await fetch(sptfy);
            data = await response.json();
            downloadButton.style.display = "none";
            
            downloadLinks += `<p>${data.data.title} │ ${data.data.artist} </p>`;
            downloadLinks += `<a href="${data.data.download}" download>Download Musik</a>`;
            }*/ else if (url.includes('youtu.be')) {
                response = await fetch(yt);
            data = await response.json();
            
            const { title, data: ytData } = data.result;
            downloadLinks = `<p>${title}</p>`;
            
            if (ytData.fhd) {
                downloadLinks += `<a href="${ytData.fhd.url}" download> Download Video FHD (1080p)<br>Size FHD: ${ytData.fhd.size}</a>`;
                }
                if (ytData.hd) {
                    downloadLinks += `<a href="${ytData.hd.url}" download> Download Video HD (720p)<br>Size HD: ${ytData.hd.size}</a>`;
                    }
                    if (ytData.sd) {
                        downloadLinks += `<a href="${ytData.sd.url}" download> Download Video SD (480p)<br>Size SD: ${ytData.sd.size}</a>`;
                        }
                        if (ytData.mp3) {
                            downloadLinks += `<a href="${ytData.mp3.url}" download> Download Audio (mp3)<br>Size MP3: ${ytData.mp3.size}</a>`;
                            }
        } else {
            throw new Error('Unsupported URL!, Hanya support ig/tt/yt');
        }
        console.log('URL:', url);
        console.log('Response:', response);
        console.log('Data:', data);
        console.log('Download Links:', downloadLinks);
        document.getElementById('downloadLinks').innerHTML = downloadLinks;
    } catch (error) {
        if (error.message === 'Unsupported URL!, Hanya support ig/tt/yt') {
            alert("Unsupported URL!, Hanya support ig/tt/yt");
        } else {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Terjadi Error, pastikan link yg ingin di download bukanlah private atau coba periksa koneksi internet anda</p>`;
            downloadButton.style.display = "flex";
        }
        console.log(error.message);
    } finally {
        downloadButton.innerHTML = 'Download';
    }
}

function getValue(){
    const downloadButton = document.querySelector('button');
    downloadButton.style.display = "flex";
    document.getElementById('downloadLinks').style.display = "none";
}