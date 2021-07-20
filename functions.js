// GETTING COMIC //
function getComic(comicNum = 1) {
    var request = new XMLHttpRequest();
    request.open('GET', `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${comicNum}`, true);
    var data = JSON.parse(this.response);
    return data
}

function getComicTitle(data) {
    const comicTitle = data.title;
    return comicTitle
}

function getComicImg(data) {
    const comicImg = data.img;
    return comicImg
}


// CHANGE COMIC // 
function changeComic(btnID, comicNum) {
    const btn = document.querySelector(`#${btnID}`);

    btn.addEventListener('click', function onButtonClick() {
        if (btnID === "prevButton") {
            comicNum -= 1;
        } else if (btnID === "nextButton") {
            comicNum += 1;
        } else {
            comicNum = Math.floor(Math.random() * 10000) + 1;
        }
    })
}