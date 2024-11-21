var loader = document.getElementById('loader');

window.addEventListener('load', function () {
    loader.style.display = 'none';
});

// Fungsi untuk menginisialisasi riwayat percakapan
function initializeConversationHistory() {
    let conversationHistory = [];
    const storedHistory = localStorage.getItem('conversationHistory');

    if (storedHistory) {
        conversationHistory = JSON.parse(storedHistory);
    }

    if (conversationHistory.length === 0) {
        conversationHistory.push({
            role: 'assistant',
            content: "Jawab sebagai asisten yang supportif dan juga kamu adalah pribadi yang menyenangkan"
        });
        localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    }
}

// Panggil fungsi ini saat aplikasi dimulai, misalnya dalam event 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', localStorage.clear());
document.addEventListener('DOMContentLoaded', initializeConversationHistory);

function back() {
    window.open("/dashboard/Playground/index.html")
}

function faq() {
    document.querySelector(".contentFAQ").style.display = "flex"
}

function closeFaq() {
    document.querySelector(".contentFAQ").style.display = "none"
}

var iconTheme = document.getElementById("theme-button")
function changeTheme() {
    document.body.classList.toggle("darkTheme")
    if (document.body.classList.contains("darkTheme")) {
        iconTheme.innerText = "light_mode";
    } else {
        iconTheme.innerText = "dark_mode";
    }
}

var textarea = document.getElementById('message');
textarea.addEventListener("input", e => {
    textarea.style.height = "50px";
    var height = e.target.scrollHeight;
    textarea.style.height = height + 'px';

    if (height > 70) {
        textarea.style.borderRadius = "15px";
    } else {
        textarea.style.borderRadius = "30px";
    }
})

let chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");
const chatBox = document.querySelector(".chatBox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>` : `<svg fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="sparkle" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"><text x="-9999" y="-9999">ChatGPT</text><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill="currentColor"/></svg>
    <pre><p></p></pre>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

let generateResponse = (incomingChatLi) => {
    const API_URL = "https://aemt.uk.to/post/gpt-prompt";
    const messageElement = incomingChatLi.querySelector("p");
    chatInput.readOnly = true;
    chatInput.placeholder = 'Mohon tunggu...'


    let conversationHistory = [];

    // Cek apakah ada riwayat percakapan di localStorage
    const storedHistory = localStorage.getItem('conversationHistory');
    if (storedHistory) {
        conversationHistory = JSON.parse(storedHistory);
    }

    // Tambahkan pesan pengguna ke riwayat percakapan
    addMessageToHistory('user', userMessage);

    // Siapkan payload yang berisi seluruh riwayat percakapan
    const payload = {
        messages: conversationHistory
    };
    console.log(payload)

    // Kirim seluruh riwayat percakapan ke server
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.result;
            // Tambahkan respons asisten ke riwayat percakapan
            addMessageToHistory('assistant', data.result);
        })
        .catch(error => {
            console.error('Error:', error);
        }).finally(
            () => {
                chatBox.scrollTo(0, chatBox.scrollHeight)
                chatInput.readOnly = false;
                chatInput.placeholder = 'Masukkan pertanyaanmu disini...';
            }
        );

    function addMessageToHistory(role, content) {
        conversationHistory.push({ role, content });
        localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    }

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
}

sendChatBtn.addEventListener("click",
    handleChat);

const paste = document.getElementById('paste-button');

paste.addEventListener("click",
    async () => {
        const read = await navigator.clipboard.readText()
        chatInput.value = read
    })
