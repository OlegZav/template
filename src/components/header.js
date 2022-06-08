import React from "react";
import { HeaderContext } from "../context";
import { useContext } from "react";

function Header() {
  const { setSearchData } = useContext(HeaderContext);
  const ERR = 'Нам очень жаль, но произошла ошибка. Пожалуйста, посмотрите выше тип ошибки (┬┬﹏┬┬)';


  function getApiData(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }

  function getResult(value) {
    if (value !== "") {
      getApiData(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${value}&api_key=d1000af359abdc5da2cf58cb576e8c75&format=json`
      ).then((data) => {
        if (typeof data === 'undefined') {
          console.log(ERR);
        }
        else {
          return setSearchData(data.results.trackmatches.track);
        }
      });
    } else setSearchData([]);
  }
  return (
    <header className="header">
      <a href="/" className="header__logo link">
        <img src="./Spotify_Logo_RGB_White.png" alt="Логотип" width="100%" height="40" max-width="131" />
      </a>
      <input
        type="search"
        className="header__search"
        placeholder="Исполнитель, трек или подкаст"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getResult(e.target.value);
          }
        }}
        />
    </header>
    );
}

export default Header;