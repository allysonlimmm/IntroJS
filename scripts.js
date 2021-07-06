// GETTING COMIC //

function getComic(comicNum) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://xkcd.com/${comicNum}/info.0.json`, true)
    request.onload = function() {
        const data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            const h1 = document.createElement('h1');
            h1.textContent = data.title;
            
            const img = document.createElement('img');
            img.src = data.img
        }
        else {
            const errorMsg = document.createElement('marquee')
            errorMsg.textContent = "Oh no, it's not working!"
            app.appendChild(errorMsg)
        }
    }
    request.send()
}
