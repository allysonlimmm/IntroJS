const MAX_COMIC = 2475;

// GETTING COMIC //
async function getComic(comicNum) {
	const data = await Promise.all(getComicNumbers(comicNum)
					.map((num) => fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${num}`)));
    return await Promise.all(data.map((d) => d.json()));
}

function getComicTitle(item) {
    return item['title'];
}

function getComicImg(item) {
    return item['img'];
}

function getComicAlt(item) {
    return item['alt'];
}

function getComicNumber(comicNum) {
	const num = comicNum % MAX_COMIC;
	return num ? num : MAX_COMIC;
}

function getComicNumbers(comicNum) {
	return Array.from({ length: size }, (val, i) => getComicNumber(comicNum - Math.floor(size / 2) + i));
}

async function updateComics(comicNum) {
    const comicList = document.querySelector('#comicList');
    const comicTitle = document.querySelector('#comicTitle');
    const loading = document.querySelector("#loadingDiv");
    const comicNumSelector = document.querySelector("#comicNum");   
	
    comicList.innerHTML = '';
    loading.classList.remove("hidden")
    const data = await getComic(comicNum);
	loading.classList.add("hidden");
    comicNumSelector.innerText = `Showing comics ${getComicNumbers(comicNum).join("/")} out of ${MAX_COMIC}`;
	comicList.innerHTML = '';
	data.forEach((comic) => {
		const item = document.createElement("div");
		item.className = "column";
		item.innerHTML = `
		<img src="${getComicImg(comic)}" alt="${getComicAlt(comic)}"/>
		`;
		comicList.appendChild(item);
	});
	comicTitle.innerText = getComicTitle(data[Math.floor(size / 2)]);
}

let comicNum = 2;
let size = 3;

updateComics(comicNum);

const prevButton = document.getElementById('prevBtn');

prevButton.onclick = function () {
	comicNum -= size;
	if (comicNum <= 0) comicNum += MAX_COMIC;
	updateComics(comicNum);
};

const nextButton = document.getElementById('nextBtn');

nextButton.onclick = function () {
	comicNum += size;
	if (comicNum > MAX_COMIC) comicNum -= MAX_COMIC;
	updateComics(comicNum);
};

const randButton = document.getElementById('randBtn');

randButton.onclick = function () {
	comicNum = Math.floor(Math.random() * 2496) + 1;
	updateComics(comicNum);
};

const submitButton = document.getElementById('submit');

submitButton.onclick = function () {
	const searchInput = document.getElementById('comicInput');
	const comicInput = Number(searchInput.value);
	if (isNaN(comicInput) || comicInput < 1 || comicInput > MAX_COMIC) {
		window.alert('Invalid Search Input');
	} else {
		comicNum = comicInput;
		updateComics(comicNum);
	}
};

const sizeSelector = document.getElementById('size');

sizeSelector.onchange = function () {
	size = Number(sizeSelector.value);
	updateComics(comicNum);
}