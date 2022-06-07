/** Необходимые константы */
const KEY = "d1000af359abdc5da2cf58cb576e8c75";
const MAIN_URL = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=d1000af359abdc5da2cf58cb576e8c75&format=json`;
const ERR = 'Нам очень жаль, но произошла ошибка. Пожалуйста, посмотрите выше тип ошибки (┬┬﹏┬┬)'

/** Вызов главного метода */
getTop();

/** Поисковая функция */
document.querySelector(".header__search").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		if (e.target.value === "") {
			const content = document.querySelector(".content-body");
			content.textContent = "";
			const heading = document.querySelector(".name");
			heading.textContent = "Популярные исполнители: ";
			getTop();
		} else {
			getData(
					`https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${e.target.value}&api_key=${KEY}&format=json`
				)
				.then((result) => {
					const content = document.querySelector(".content-body");
					content.textContent = "";
					const heading = document.querySelector(".name");
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
	const container = document.querySelector(".content-body");

	const element = document.createElement("div");
	const artistData = document.createElement('div');

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
	const buttonData = document.createElement("button");
	const img = document.createElement('img');

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
	const pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание столбца с информацией о треке */
function addContainer(item) {
	const dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));

	return dataContainer;
}

/** Создание информации об исполнителе */
function addArtist(item) {
	const dataAlbum = document.createElement('div');

	dataAlbum.className = "data";

	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addValue(item, 'artist'));

	return dataAlbum;
}

/** Создание информации о позиции трека */
function addPlace(item) {
	const dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

/** Создание поля исполнителя */
function addArtistLabel() {
	const pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Исполнитель альбома: "));
	return pAlbum;
}

/** Создание значения-ссылки об исполнителе */
function addValue(item, choice) {
	const pValue = document.createElement('p');
	const aElement = document.createElement("a");

	pValue.className = "playlist-name number";

	aElement.href = item.url;
	aElement.className = "value";

	pValue.appendChild(aElement);
	if (choice == 'artist')
		aElement.appendChild(document.createTextNode(item.artist.name));
	if (choice == 'listener')
		aElement.appendChild(document.createTextNode(item.listeners));
	return pValue;
}

/** Создание поля позиции трека */
function addPlaceLabel() {
	const pPlace = document.createElement('p');
	pPlace.className = "playlist-name";
	pPlace.appendChild(document.createTextNode("Место: "));
	return pPlace;
}

/** Создание значения позиции трека */
function addPlaceValue(item) {
	const pPlaceNumber = document.createElement('p');
	pPlaceNumber.className = "playlist-name number";
	pPlaceNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return pPlaceNumber;
}

/** Создание информации о треке */
function addInfo(item) {
	const divData = document.createElement('div');

	divData.appendChild(addInfoTrack(item));
	divData.appendChild(addInfoArtist(item));

	return divData;
}

/** Создание информации о названии трека */
function addInfoTrack(item) {
	const pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание информации об исполнителе трека */
function addInfoArtist(item) {
	const pArtist = document.createElement('p');
	pArtist.className = "song_artist_name";
	pArtist.appendChild(document.createTextNode(item.artist));
	return pArtist;
}

/** Создание столбца с информацией о прослушиваниях */
function addContainerListener(item) {
	const dataContainer = document.createElement('div');
	const dataAlbum = document.createElement('div');

	dataContainer.className = "data_container";
	dataAlbum.className = "data";

	dataContainer.appendChild(dataAlbum);
	dataAlbum.appendChild(addListenerLabel());
	dataAlbum.appendChild(addValue(item, 'listener'));

	return dataContainer;
}

/** Создание поля прослушиваний трека */
function addListenerLabel() {
	const pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Слушателей: "));
	return pAlbum;
}

/** Создание результатов поиска */
function searchValues(item) {
	const container = document.querySelector(".content-body");

	const element = document.createElement("div");
	const artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addInfo(item));
	artistData.appendChild(addContainerListener(item));
}