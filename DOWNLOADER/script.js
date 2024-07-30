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
        const supportedUrls = ['instagram.com', 'tiktok.com', 'facebook.com', 'fb.watch', 'reel', 'spotify.com', 'youtu.be'];

        if (!supportedUrls.some(supportedUrl => url.includes(supportedUrl))) {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Unsupported URL! Hanya support tt/fb/ig/yt</p>`;
            return;
        }

        const ig = `https://api.nyxs.pw/dl/ig?url=${encodeURIComponent(url)}`;
        const tt = `https://api.nyxs.pw/dl/tiktok?url=${encodeURIComponent(url)}`;
        //const yt = `https://api.nyxs.pw/dl/yt?url=${encodeURIComponent(url)}`;
        const yt = `https://itzpire.com/download/youtube?url=${encodeURIComponent(url)}`
        const Playt = `https://itzpire.com/download/play-youtube?title=${encodeURIComponent(url)}`
        const fb = `https://api.nyxs.pw/dl/fb?url=${encodeURIComponent(url)}`;
        const sptfy = `https://itzpire.com/download/spotify?url=${encodeURIComponent(url)}`

        let response, data;
        let downloadLinks = '';  // Initialize downloadLinks

        if (url.includes('instagram.com')) {
            response = await fetch(ig);
            data = await response.json();
            downloadButton.style.display = "none";
            data.result.forEach((item, index) => {
                downloadLinks += `<a href="${item.url}" download>Download File ${index + 1}</a>`;
            });
        } else if (url.includes('tiktok.com')) {
            response = await fetch(tt);
            data = await response.json();
            downloadButton.style.display = "none";

            if (data.result.type === 'images') {
                // downloadLinks += `<p>${data.result.desc} │ ${data.result.author.nickname}</p>`;
                data.result.images.forEach((imageUrl, index) => {
                    downloadLinks += `
                    <div id="cnainer-dwnlad">
                        <img src="${imageUrl}" alt="image_file" id="image-file">
                        <a href="${imageUrl}" download>Download Image ${index + 1}</a>
                    </div>
                    `;
                });
                downloadLinks += `<a href="${data.result.music}" target="_blank" download>Download Music Audio</a>`;
            } else {
                // downloadLinks += `<p>${data.result.desc} │ ${data.result.author.nickname}</p>`;
                downloadLinks += `
                    <img src="${data.result.thumbnail}" alt="image_file" id="image-file">
                    <p>${data.result.caption}</p>
                    <a href="${data.result.video_sd}" target="_blank" download>Download Video</a>
                    <a href="${data.result.video_hd}" target="_blank" download>Download HD Video</a>
                    <a href="${data.result.music}" target="_blank" download>Download Music Audio</a>
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
                            }*/ else if (/(reel|fb|facebook\.com|fb\.watch)/i.test(url)) {
                                response = await fetch(fb);
            data = await response.json();
            downloadButton.style.display = "none";
            
            const { hd, sd } = data.result;
            
            if (hd) {
                downloadLinks += `<a href="${hd}" download>Download Video HD</a>`;
            }
            if (sd) {
                downloadLinks += `<a href="${sd}" download>Download Video SD</a>`;
            }
        
        } /*else if (url.includes('spotify.com')) {
            response = await fetch(sptfy);
            data = await response.json();
            downloadButton.style.display = "none";
            
            downloadLinks += `<p>${data.data.title} │ ${data.data.artist} </p>`;
            downloadLinks += `<a href="${data.data.download}" download>Download Musik</a>`;
            }*/ else if (url.includes('youtu.be', 'youtube')) {
                response = await fetch(yt);
                data = await response.json();
                console.log(data)
            downloadButton.style.display = "none";
            
            downloadLinks += `
            <img src="${data.data.video.thumb}" alt="image_file" id="image-file">
            <p>${data.data.video.title} │ ${data.data.video.channel} </p>
            `;
            downloadLinks += `<a href="${data.data.video.url}" download>Download Video</a>`;
            downloadLinks += `<a href="${data.data.audio.url}" download>Download Musik</a>`;
        } else {
            response = await fetch(tt);
            data = await response.json();
            downloadButton.style.display = "none";
        }
        console.log('URL:', url);
        console.log('Response:', response);
        console.log('Data:', data);
        console.log('Download Links:', downloadLinks);
        document.getElementById('downloadLinks').innerHTML = downloadLinks;
    } catch (error) {
        if (error.message === 'Unsupported URL!, Hanya support fb/ig/tt/yt') {
            alert("Unsupported URL!, Hanya support fb/ig/tt/yt");
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