(function changeComic(btnID, comicNum) {
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
})();