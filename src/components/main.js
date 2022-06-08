import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TopCard from "./topCard";
import Card from "./Card";
import { Context } from "../context";
function Main() {
  const [topArtists, setTopArtists] = useState([]);
  const { searchData, searchString } = useContext(Context);
  const getTopUrl = "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=edm&api_key=d1000af359abdc5da2cf58cb576e8c75&format=json";
  const ERR = 'Нам очень жаль, но произошла ошибка. Пожалуйста, посмотрите выше тип ошибки (┬┬﹏┬┬)';

  useEffect(() => {
    function getTop() {
      getApiData(getTopUrl).then((data) => {
        if (typeof data === 'undefined') {
          console.log(ERR);
        }
        else {
          setTopArtists(data.albums.album);
        }
      });
    };
    getTop();
  }, []);

  
  function getApiData(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
  
  if (searchString === "") {
    return (
      <main className="content">
        <h2 className="name">Топ исполнителей: </h2>
        <div className="artist_content">
          {topArtists.map((item) => {
            return <TopCard key={item.name} data={item}></TopCard>;
          })}
        </div>
      </main>
    );
  } else {
    return (
      <main className="content">
        <h2 className="name">Результаты поиска: </h2>
        <div className="artist_content">
          {searchData.map((item) => {
            return <Card key={item.url} data={item}></Card>;
          })}
        </div>
      </main>
    );
  }
}

export default Main;