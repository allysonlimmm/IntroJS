// GETTING COMIC //
(async function getComic(comicNum = 1) {
    const data = await fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${comicNum}`);
    return data.json();
})();

(function getComicTitle() {
    const data = getComic(comicNum);
    const comicTitle = data.title;
    return comicTitle
})();

(function getComicImg() {
    const data = getComic(comicNum);
    const comicImg = data.img;
    return comicImg
})();
