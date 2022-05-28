/** Необходимые константы */
const apiKey = "d1000af359abdc5da2cf58cb576e8c75";
const getUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=d1000af359abdc5da2cf58cb576e8c75&format=json`;

/** Вызов главного метода */
getTop();

/** Поисковая функция */
document.querySelector(".header__search").addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		if (e.target.value === "") {
			document.querySelector(".content-body").innerHTML = "";
			document.querySelector(".name").innerHTML = "Популярные исполнители: ";
			getTop();
		} else {
			getData(
					`http://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${e.target.value}&api_key=${apiKey}&format=json`
				)
				.then((result) => {
					document.querySelector(".content-body").innerHTML = "";
					document.querySelector(".name").innerHTML = "Результаты поиска: ";
					result.results.trackmatches.track.forEach((item) => {
						searchValues(item);
					});
				});
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
	getData(getUrl).then((data) =>
		data.albums.album.forEach((item) => {
			topArtists(item);
		})
	);
}

/** Создание карточек с информацией о популярных композициях */
function topArtists(item) {
	container = document.querySelector(".content-body");

	element = document.createElement("div");
	artistData = document.createElement('div');

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
	buttonData = document.createElement("button");
	img = document.createElement('img');

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
	pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание столбца с информацией о треке */
function addContainer(item) {
	dataContainer = document.createElement('div');

	dataContainer.className = "data_container";

	dataContainer.appendChild(addArtist(item));
	dataContainer.appendChild(document.createElement('hr'));
	dataContainer.appendChild(addPlace(item));

	return dataContainer;
}

/** Создание информации об исполнителе */
function addArtist(item) {
	dataAlbum = document.createElement('div');

	dataAlbum.className = "data";

	dataAlbum.appendChild(addArtistLabel());
	dataAlbum.appendChild(addArtistValue(item));

	return dataAlbum;
}

/** Создание информации о позиции трека */
function addPlace(item) {
	dataPlace = document.createElement('div');

	dataPlace.className = "data";

	dataPlace.appendChild(addPlaceLabel());
	dataPlace.appendChild(addPlaceValue(item));

	return dataPlace;
}

/** Создание поля исполнителя */
function addArtistLabel() {
	pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Исполнитель альбома: "));
	return pAlbum;
}

/** Создание значения-ссылки об исполнителе */
function addArtistValue(item) {
	pAlbumNumber = document.createElement('p');
	aElement = document.createElement("a");

	pAlbumNumber.className = "playlist-name number";

	aElement.href = item.url;
	aElement.style = "color: #4bdf80";

	pAlbumNumber.appendChild(aElement);
	aElement.appendChild(document.createTextNode(item.artist.name));

	return pAlbumNumber;
}

/** Создание поля позиции трека */
function addPlaceLabel() {
	pPlace = document.createElement('p');
	pPlace.className = "playlist-name";
	pPlace.appendChild(document.createTextNode("Место: "));
	return pPlace;
}

/** Создание значения позиции трека */
function addPlaceValue(item) {
	pPlaceNumber = document.createElement('p');
	pPlaceNumber.className = "playlist-name number";
	pPlaceNumber.appendChild(document.createTextNode(item["@attr"].rank));
	return pPlaceNumber;
}

/** Создание информации о треке */
function addInfo(item) {
	divData = document.createElement('div');

	divData.appendChild(addInfoTrack(item));
	divData.appendChild(addInfoArtist(item));

	return divData;
}

/** Создание информации о названии трека */
function addInfoTrack(item) {
	pName = document.createElement('p');
	pName.className = "artist_name";
	pName.appendChild(document.createTextNode(item.name));
	return pName;
}

/** Создание информации об исполнителе трека */
function addInfoArtist(item) {
	pArtist = document.createElement('p');
	pArtist.className = "song_artist_name";
	pArtist.appendChild(document.createTextNode(item.artist));
	return pArtist;
}

/** Создание столбца с информацией о прослушиваниях */
function addContainerListener(item) {
	dataContainer = document.createElement('div');
	dataAlbum = document.createElement('div');

	dataContainer.className = "data_container";
	dataAlbum.className = "data";

	dataContainer.appendChild(dataAlbum);
	dataAlbum.appendChild(addListenerLabel());
	dataAlbum.appendChild(addListenerValue(item));

	return dataContainer;
}

/** Создание поля прослушиваний трека */
function addListenerLabel() {
	pAlbum = document.createElement('p');
	pAlbum.className = "playlist-name";
	pAlbum.appendChild(document.createTextNode("Слушателей: "));
	return pAlbum;
}

/** Создание значения-ссылки о прослушиваниях */
function addListenerValue(item) {
	pAlbumNumber = document.createElement('p');
	aElement = document.createElement("a");

	pAlbumNumber.className = "playlist-name number";

	aElement.href = item.url;
	aElement.style = "color: #4bdf80";

	pAlbumNumber.appendChild(aElement);
	aElement.appendChild(document.createTextNode(item.listeners));

	return pAlbumNumber;
}

/** Создание результатов поиска */
function searchValues(item) {
	container = document.querySelector(".content-body");

	element = document.createElement("div");
	artistData = document.createElement('div');

	element.className = "card";
	artistData.className = "artist_data";

	container.appendChild(element);
	element.appendChild(artistData);
	artistData.appendChild(addImage());
	artistData.appendChild(addInfo(item));
	artistData.appendChild(addContainerListener(item));
}