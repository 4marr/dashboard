var loader = document.getElementById('loader');

window.addEventListener('load', function() {
    loader.style.display = 'none';
});

function back(){
    window.open("\dashboard\Playground\index.html")
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

let chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatBox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>`: `<pre><p></p></pre>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

let generateResponse = (incomingChatLi) => {
    const prompt = document.getElementById('message').value;
    var percakapanTerakhir;
    let apiUrl = `https://api.nyxs.pw/ai/gemini?text=${encodeURIComponent(prompt)}`;
    let hasil = incomingChatLi.querySelector("p")
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            hasil.textContent = data.result;
        } else {
            hasil.textContent = 'Maaf, saya tidak mengerti apa yang Anda tanyakan. Bisakah Anda ulangi pertanyaan Anda?';
        }
    })
    .catch(error => {
        hasil.textContent = 'Terjadi kesalahan pada sistem, coba lagi nanti.';
        console.error('Error:', error);
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight)

    const incomingChatLi = createChatLi("...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    generateResponse(incomingChatLi)
    chatInput.value = "";

    var counter = 6;
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            chatInput.readOnly = true;
            chatInput.placeholder = 'Mohon tunggu dalam ' + counter + ' detik';
        }
        if (counter === 0) {
            chatInput.readOnly = false;
            chatInput.placeholder = 'Masukkan pertanyaanmu disini...';
        }
    },
        1000);
}

sendChatBtn.addEventListener("click",
    handleChat);

const paste = document.getElementById('paste-button');

paste.addEventListener("click",
    async() => {
        const read = await navigator.clipboard.readText()
        chatInput.value = read
    })