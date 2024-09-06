var textarea = document.getElementById('description');
textarea.addEventListener("input", e => {
    textarea.style.height = 'auto';
    var height = e.target.scrollHeight;
    textarea.style.height = height + 'px';
})
function send(){
    let description = document.getElementById("description").value;
    let text = "BUG REPORT"
    let gabungan = text + "%0A" + `${encodeURIComponent(description)}`;
    let token = '7180436531:AAFk8zEKwCJTeUGvN6fgw9rDqu6_iOHbCfk';
    let grup = '-4271367193';
    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
    })
    document.querySelector(".report").style.display = "none";
    document.querySelector(".done").style.display = "flex";
}
function back() {
    window.location.reload();
}
