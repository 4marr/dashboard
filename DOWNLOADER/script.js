async function searchVideo() {
    const downloadButton = document.querySelector('button');
    downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

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
            alert('URL cannot be empty!');
            return;
        }
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
        const supportedUrls = ['instagram.com', 'tiktok.com', 'youtube.com', 'youtu.be', 'facebook.com', 'fb.watch', 'reel'];

        // if (!supportedUrls.some(supportedUrl => url.includes(supportedUrl)) && !youtubeRegex.test(url)) {
        //     alert('Unsupported URL!, Hanya support fb/ig/tt/yt');
        //     return;
        // }

        const ig = `https://api.ryzendesu.vip/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const tt = `https://api.nyxs.pw/dl/tiktok?url=${encodeURIComponent(url)}`;
        const yt = `https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(url)}`;
        const searchYt = `https://itzpire.com/search/youtube?query=${encodeURIComponent(url)}`;
        const fb = `https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`;

        let response, data;
        let downloadLinks = '';  // Initialize downloadLinks

        if (url.includes('instagram.com')) {
            response = await fetch(ig);
            data = await response.json();
            data.data.forEach((item, index) => {
                downloadLinks += `
                <img src="${item.thumbnail}" alt="thumbnail" />
                <a href="${item.url}" download>Download File ${index + 1}</a>`;
            });
        } else if (url.includes('tiktok.com')) {
            response = await fetch(tt);
            data = await response.json();

            if (data.result.type === 'image') {
                data.result.images.forEach((imageUrl, index) => {
                    downloadLinks += `<a href="${imageUrl}" download>Download Image ${index + 1}</a>`;
                });
                downloadLinks += `<a href="${data.result.audio}" target="_blank" download>Download Music Audio</a>`;
            } else {
                downloadLinks += `
                    <p>${data.result.desc}</p>
                    <a href="${data.result.video}" target="_blank" download>Download Video</a>
                    <a href="${data.result.videoWatermark}" target="_blank" download>Download Video With Watermark</a>
                    <a href="${data.result.music}" target="_blank" download>Download Music Audio</a>
                `;
            }
        } else if (youtubeRegex.test(url)) {
            response = await fetch(yt);
            data = await response.json();

            downloadLinks += `
            <a href="${data.videoUrl}" target="_blank" download>Download Video</a>
            <a href="${data.audioUrl}" target="_blank" download>Download Music Audio</a>
        `;
        } else if (/(reel|fb|facebook\.com|fb\.watch)/i.test(url)) {
            response = await fetch(fb);
            data = await response.json();
        
            downloadLinks += `<img src="${data.data[0].thumbnail} alt="thumbnail" />`
            data.data.forEach((item) => {
                downloadLinks += `<a href="${item.url}" download>Download Video ${item.resolution}</a>`;
            });
        
        } else {
            response = await fetch(searchYt);
            data = await response.json();

            downloadLinks += `<p>Download video atau audio menggunakan judul atau title masih dalam tahap pengmbangan!</p>`
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
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Terjadi Error, pastikan link yg ingin di download bukanlah private</p>`;
        }
        console.log(error.message);
    } finally {
        downloadButton.innerHTML = 'Search';
    }
}

function getValue(){
    const downloadButton = document.querySelector('button');
    downloadButton.style.display = "flex";
}