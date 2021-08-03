// GETTING COMIC //
async function getComic(comicNum) {
    let dataList = [];
    for (let i = comicNum-1; i <= comicNum+1; i++) {
        const data = await fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${i}`);
        dataList.push(await data.json());
    }
    return dataList;
}

function getComicTitle(item) {
    const comicTitle = item['title'];
    return comicTitle
}

function getComicImg(item) {
    const comicImg = item['img'];
    return comicImg
}

function getComicAlt(item) {
    const comicAlt = item['alt'];
    return comicAlt
}


async function updateComics(btnID, comicNum) {

    const comicList = document.querySelector('#comicList');
    const comicTitle = document.querySelector('#comicTitle');
    const btn = document.querySelector(`#${btnID}`);
    const loading = document.querySelector("#loadingDiv");
    const comicNumSelector = document.querySelector("#comicNum");
    const submit = document.querySelector('#submit');
    
    submit.addEventListener('click', function onButtonClick() {
        comicNum = document.getElementById("submit").onclick;
    })    

    btn.addEventListener('click', function onButtonClick() {
        if (btnID==="prevBtn") {
            if (comicNum >= 5) {
                comicNum = comicNum - 3;
            }
            else {
                comicNum = 2;
                alert("You have reached the start of the comic list.")
            }
        }
        else if (btnID==="randBtn") {
            comicNum = Math.floor(Math.random() * 2496) + 1;
        }
        else if (btnID==="nextBtn") {
            if (comicNum <= 2492) {
                comicNum = comicNum + 3
            }
            else {
                comicNum = 2654;
                alert("You have reached the end of the comic list.")
            }
            
        }
        updateComics('prevBtn', comicNum);
        updateComics('randBtn', comicNum);
        updateComics('nextBtn', comicNum);
    })

    
    loading.classList.remove("hidden")
    comicList.innerHTML = '';
    await getComic(comicNum)
        .then((data) => {
            loading.classList.add("hidden");
            comicNumSelector.innerText = `Showing comics ${comicNum-1}/${comicNum}/${comicNum+1} out of 2497`;
            comicList.innerHTML = '';
            data.forEach((comic) => {
                const item = document.createElement("div");
                item.className = "column";
                item.innerHTML = `
                <img src="${getComicImg(comic)}" alt="${getComicAlt(comic)}">
                `;
                comicList.appendChild(item);
            });
            comicTitle.innerText = getComicTitle(data[1]);
        });
    

}

let comicNum = 2;
updateComics('prevBtn', comicNum);
updateComics('randBtn', comicNum);
updateComics('nextBtn', comicNum);