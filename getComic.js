const MAX_COMIC = 2475;

// get all the relevant comics based on comic number arrays from API
async function getComic(comicNum) {
	const data = await Promise.all(getComicNumbers(comicNum) 
					.map((num) => fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${num}`)));
    return await Promise.all(data.map((d) => d.json()));
}

// get comic title
function getComicTitle(item) {
    return item['title'];
}

// get comic image
function getComicImg(item) {
    return item['img'];
}

// get comic alt text
function getComicAlt(item) {
    return item['alt'];
}

// handling overflow of comic numbers
function getComicNumber(comicNum) {
	const num = comicNum % MAX_COMIC;
	return num ? num : MAX_COMIC;           // if num is not 0 then show num, if not show MAX_COMIC
}

// returns an array of length based on number of comics to show, getting the corresponding comic numbers to be shown
function getComicNumbers(comicNum) {
	return Array.from({ length: size }, (val, i) => getComicNumber(comicNum - Math.floor(size / 2) + i));
}

// update webpage to show comics
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

	data.forEach((comic) => {
		const item = document.createElement("div");
		item.className = "column";
		item.innerHTML = `
		<img src="${getComicImg(comic)}" alt="${getComicAlt(comic)}"/>
		`;
		comicList.appendChild(item);
	});
	comicTitle.innerText = getComicTitle(data[Math.floor(size / 2)]);       // show comic title of the middle comic
}

// initialising variables
let comicNum = 2;
let size = 3;

updateComics(comicNum);

// identifying prev button and writing function to determine what happens when the button is clicked
const prevButton = document.getElementById('prevBtn');
// when button clicked, comic num reduces by num of comic showed >> if comicNum <= 0, then it goes back to the last comic
prevButton.onclick = function () {
	comicNum -= size;
	if (comicNum <= 0) comicNum += MAX_COMIC;
	updateComics(comicNum);
};

// identifying next button and writing function to determine what happens when the button is clicked
const nextButton = document.getElementById('nextBtn');
// when button clicked, comic num increases by num of comic showed >> if comicNum exceeds max number of comics, then it goes back to the start
nextButton.onclick = function () {
	comicNum += size;
	if (comicNum > MAX_COMIC) comicNum -= MAX_COMIC;
	updateComics(comicNum);
};

// identifying random button and writing function to determine what happens when the button is clicked
const randButton = document.getElementById('randBtn');

randButton.onclick = function () {
	comicNum = Math.floor(Math.random() * 2474) + 1;
	updateComics(comicNum);
};

// identifying submit button and updating the comic to show what the user search for
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

// identifying size button and updating the number of comics shown
const sizeSelector = document.getElementById('size');

sizeSelector.onchange = function () {
	size = Number(sizeSelector.value);
	updateComics(comicNum);
}