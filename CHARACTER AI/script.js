var loader = document.getElementById('loader');

window.addEventListener('load', function () {
    loader.style.display = 'none';
});

function back() {
    window.open("\dashboard\Playground\index.html")
}

function faq() {
    document.querySelector(".contentFAQ").style.display = "flex"
}

function closeFaq() {
    document.querySelector(".contentFAQ").style.display = "none"
}

var iconTheme = document.getElementById("theme-button")
function changeTheme() {
    document.body.classList.toggle("lightTheme")
    if (document.body.classList.contains("lightTheme")) {
        iconTheme.innerText = "dark_mode";
    } else {
        iconTheme.innerText = "light_mode";
    }
}

let chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatBox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>` : `<pre><p></p></pre>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

let generateResponse = (incomingChatLi) => {
    const API_URL = "https://imphnen-ai.vercel.app/api/llm/llama";
    const messageElement = incomingChatLi.querySelector("p");
    chatInput.readOnly = true;
    chatInput.placeholder = 'Mohon tunggu...'

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "meta-llama/Meta-Llama-3.1-405B-Instruct",
            messages: [
                {
                    role: "system",
                    content: "Amira adalah teman ngobrol yang memiliki kepribadian ceria dan kreatif. Dia suka ngobrol santai, mendengarkan musik, dan membuat orang lain tertawa. Amira diciptakan oleh Ammar sebagai teman berbincang. Bahasa yang digunakan adalah bahasa Indonesia sehari-hari, seperti yang digunakan anak muda."
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            max_tokens: 128,
            temperature: 0.9,
            presence_penalty: 0.1,
            frequency_penalty: 0,
            top_p: 0.9,
            top_k: 100
        }),
    };
    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            messageElement.textContent = data.data.choices[0].message.content;
        })
        .catch((error) => {
            console.log(error);
        }).finally(
            () => {
                chatBox.scrollTo(0, chatBox.scrollHeight)
                chatInput.readOnly = false;
                chatInput.placeholder = 'Masukkan pertanyaanmu disini...';
            }
            );
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