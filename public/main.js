/** Необходимые константы */
const KEY = "d1000af359abdc5da2cf58cb576e8c75";
const MAIN_URL = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=d1000af359abdc5da2cf58cb576e8c75&format=json`;
const ERR = 'Нам очень жаль, но произошла ошибка. Пожалуйста, посмотрите выше тип ошибки (┬┬﹏┬┬)'

/** Вызов главного метода */
getTop();

/** Поисковая функция */
document.querySelector(".header__search").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		if (e.target.value === "") {
			let content = document.querySelector(".content-body");
			content.textContent = "";
			let heading = document.querySelector(".name");
			heading.textContent = "Популярные исполнители: ";
			getTop();
		} else {
			getData(
					`http://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${e.target.value}&api_key=${KEY}&format=json`
				)
				.then((result) => {
					let content = document.querySelector(".content-body");
					content.textContent = "";
					let heading = document.querySelector(".name");
					heading.textContent = "Результаты поиска: ";
					if (typeof result === 'undefined') {
						console.log(ERR);
					}
					else {
						result.results.trackmatches.track.forEach((item) => {
							searchValues(item);
						});
					}
				})
		}
	}
});


/** GET-запрос к last.fm */
function getData(url) {
	return fetch(url)
		.then((res) => res.json())
		.catch((e) => console.log(e));
}

/** Обработка информации о топ-исполнителях  */
function getTop() {
	getData(MAIN_URL).then((data) => {
		if (typeof data === 'undefined') {
			console.log(ERR);
		}
		else {
			data.albums.album.forEach((item) => {
				topArtists(item);
			})
		}
	}
	);
}

/** Создание карточек с информацией о популярных композициях */
function topArtists(item) {
	let container = document.querySelector(".content-body");

	let element = document.createElement("div");
	let artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addTrackName(item));
	artistData.appendChild(addContainer(item));
}

/** Создание иконки трека */
function addImage() {
	let buttonData = document.createElement("button");
	let img = document.createElement('img');

	buttonData.className = "picture";

	buttonData.appendChild(img);

	img.src = "player_default_album.png";
	img.alt = "Изображение альбома";
	img.width = 58;
	img.height = 58;

	return buttonData;
}

/** Создание поля с названием трека */
function addTrackName(item) {
	let pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание столбца с информацией о треке */
function addContainer(item) {
	let dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));

	return dataContainer;
}

/** Создание информации об исполнителе */
function addArtist(item) {
	let dataAlbum = document.createElement('div');

	dataAlbum.className = "data";

	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addArtistValue(item));

	return dataAlbum;
}

/** Создание информации о позиции трека */
function addPlace(item) {
	let dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

/** Создание поля исполнителя */
function addArtistLabel() {
	let pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Исполнитель альбома: "));
	return pAlbum;
}

/** Создание значения-ссылки об исполнителе */
function addArtistValue(item) {
	let pAlbumNumber = document.createElement('p');
	let aElement = document.createElement("a");

	pAlbumNumber.className = "playlist-name number";

	aElement.href = item.url;
	aElement.className = "value";

	pAlbumNumber.appendChild(aElement);
	aElement.appendChild(document.createTextNode(item.artist.name));

	return pAlbumNumber;
}

/** Создание поля позиции трека */
function addPlaceLabel() {
	let pPlace = document.createElement('p');
	pPlace.className = "playlist-name";
	pPlace.appendChild(document.createTextNode("Место: "));
	return pPlace;
}

/** Создание значения позиции трека */
function addPlaceValue(item) {
	let pPlaceNumber = document.createElement('p');
	pPlaceNumber.className = "playlist-name number";
	pPlaceNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return pPlaceNumber;
}

/** Создание информации о треке */
function addInfo(item) {
	let divData = document.createElement('div');

	divData.appendChild(addInfoTrack(item));
	divData.appendChild(addInfoArtist(item));

	return divData;
}

/** Создание информации о названии трека */
function addInfoTrack(item) {
	let pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание информации об исполнителе трека */
function addInfoArtist(item) {
	let pArtist = document.createElement('p');
	pArtist.className = "song_artist_name";
	pArtist.appendChild(document.createTextNode(item.artist));
	return pArtist;
}

/** Создание столбца с информацией о прослушиваниях */
function addContainerListener(item) {
	let dataContainer = document.createElement('div');
	let dataAlbum = document.createElement('div');

	dataContainer.className = "data_container";
	dataAlbum.className = "data";

	dataContainer.appendChild(dataAlbum);
	dataAlbum.appendChild(addListenerLabel());
	dataAlbum.appendChild(addListenerValue(item));

	return dataContainer;
}

/** Создание поля прослушиваний трека */
function addListenerLabel() {
	let pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Слушателей: "));
	return pAlbum;
}

/** Создание значения-ссылки о прослушиваниях */
function addListenerValue(item) {
	let pAlbumNumber = document.createElement('p');
	let aElement = document.createElement("a");

	pAlbumNumber.className = "playlist-name number";

	aElement.href = item.url;
	aElement.className = "value";

	pAlbumNumber.appendChild(aElement);
	aElement.appendChild(document.createTextNode(item.listeners));

	return pAlbumNumber;
}

/** Создание результатов поиска */
function searchValues(item) {
	let container = document.querySelector(".content-body");

	let element = document.createElement("div");
	let artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addInfo(item));
	artistData.appendChild(addContainerListener(item));
}