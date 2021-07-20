// GETTING COMIC //
(async function getComic(comicNum) {
    let dataList = [];
    for (let i = comicNum-1; i <= comicNum+1; i++) {
        const data = await fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${i}`);
        dataList.push(data.json());
    }
    return dataList;
})();

(function getComicTitle(item) {
    const comicTitle = item.title;
    return comicTitle
})();

(function getComicImg(item) {
    const comicImg = item.img;
    return comicImg
})();


async function updateComics(btnID) {
    const comicList = document.querySelector('#comicList');
    const comicTitle = document.querySelector('#comicTitle');
    const btn = document.querySelector(`#${btnID}`);
    let comicNum = 1;

    btn.addEventListener('click', function onButtonClick() {
        if (btnID="prevBtn") {
            comicNum -=1
        }
        else if (btnID="randBtn") {
            comicNum = Math.floor(Math.random() * 10000) + 1;
        }
        else if (btnID="nextBtn") {
            comicNum += 1
        }
    })

    let data = getComic(comicNum);

    comicList.innerHTML = '';
    data.forEach((comic) => {
        const item = document.createElement('li');
        item.className = "p-6";
        item.innerHTML = `
        <img src="${getComicImg(comic)}">
        `;
        comicList.appendChild(item);
    });
    comicTitle.innerText = getComicTitle(data[1]);
}

updateComics('prevBtn');
updateComics('randBtn');
updateComics('nextBtn');