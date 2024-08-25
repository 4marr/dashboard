var loader = document.getElementById('loader');

window.addEventListener('load', function() {
    loader.style.display = 'none';
});

function back(){
    window.open(".\dashboard\Playground\index.html")
}

function faq() {
    document.querySelector(".contentFAQ").style.display = "flex"
}

function closeFaq() {
    document.querySelector(".contentFAQ").style.display = "none"
}

var iconTheme = document.getElementById("theme-button")
function changeTheme(){
    document.body.classList.toggle("darkTheme")
    if(document.body.classList.contains("darkTheme")){
        iconTheme.innerText = "light_mode";
    }else{
        iconTheme.innerText = "dark_mode";
    }
}

var textarea = document.getElementById('message');
textarea.addEventListener("input", e => {
    textarea.style.height = "50px";
    var height = e.target.scrollHeight;
    textarea.style.height = height + 'px';

    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
})



let chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatBox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>`: `<img src="sparkles.svg" alt="" class="sparkle" /><pre><p></p></pre>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

let generateResponse = (incomingChatLi) => {
    const prompt = document.getElementById('message').value;
    let apiUrl = `https://api.nyxs.pw/ai/gemini?text=${encodeURIComponent(prompt)}`;
    let hasil = incomingChatLi.querySelector("p")
    chatInput.readOnly = true;
    chatInput.placeholder = 'Mohon tunggu...'
    textarea.style.borderRadius = "30px";
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            hasil.innerHTML = data.result.replace(/\*\*/g, "<strong>");
        } else {
            hasil.textContent = 'Maaf, saya tidak mengerti apa yang Anda tanyakan. Bisakah Anda ulangi pertanyaan Anda?';
        }
    })
    .catch(error => {
        hasil.textContent = 'Terjadi kesalahan pada sistem, coba lagi nanti.';
        console.error('Error:', error);
    }).finally(
        () => { chatBox.scrollTo(0, chatBox.scrollHeight)
            chatInput.readOnly = false;
            chatInput.placeholder = 'Masukkan pertanyaanmu disini...';
            textarea.style.borderRadius = "30px";
        }
    );
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight)
    document.getElementById("saran").style.display = "none";

    const incomingChatLi = createChatLi("...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    generateResponse(incomingChatLi)
    chatInput.value = "";
    textarea.style.height = "50px";
}

sendChatBtn.addEventListener("click",
    handleChat);

const paste = document.getElementById('paste-button');

paste.addEventListener("click",
    async() => {
        const read = await navigator.clipboard.readText()
        chatInput.value = read
    })

function divSatu() {
    document.getElementById("message").value = "Jelaskan konsep [konsep] dari sudut pandang [objek]. Gunakan metafora dan analogi yang kreatif."
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
}
function divDua() {
    document.getElementById("message").value = "Bayangkan dunia 100 tahun dari sekarang. Bagaimana [Teknologi/Perubahan sosial] telah merubah cara kita hidup? Ceritakan sebuah kisah singkat yang menggambarkan perubahan tersebut."
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
}
function divTiga() {
    document.getElementById("message").value = "Buatlah dialog antara [karakter 1] dan [karakter 2]. Tema dialog adalah [tema]."
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
}
function divEmpat() {
    document.getElementById("message").value = "Buatlah resep unik yang menggabungkan [bahan] dengan [bahan]. Pertimbangkan tekstur, rasa, dan tampilan hidangan."
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
}
function divLima() {
    document.getElementById("message").value = "Kemukakan ide bisnis yang dapat memecahkan masalah [masalah]. Jelaskan target pasar, model bisnis, dan keunggulan kompetitif."
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
    if (height > 60) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
}
