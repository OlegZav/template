import React from 'react';
import {useContext} from "react";
import {Context} from "../context";

function Request() {
    const ERR = 'Нам очень жаль, но произошла ошибка. Пожалуйста, посмотрите выше тип ошибки (┬┬﹏┬┬)'
    const { setSearchData } = useContext(Context);

    function getApiData(url) {
        return fetch(url)
            .then((res) => res.json())
            .catch((e) => console.log(e));
    }

    function getResult(value) {
        if (value !== "") {
            getApiData(
                `https://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&track=${value}&api_key=a15921d44a0fcd14ba611ad341dbf3d6&format=json`
            ).then((data) => {
                if (typeof data === 'undefined') {
                    console.log(ERR);
                } else {
                    return setSearchData(data.results.trackmatches.track);
                }
            });
        } else setSearchData([]);
    }
    return (<input 
        type="search"
        className="header__search"
        placeholder="Исполнитель, трек или подкаст"
        onKeyDown = {(e) => {
            if (e.keyCode === 13) {
                getResult(e.target.value);
            }
        }}
        />
    )
}

export default Request;