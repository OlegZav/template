import React from "react";
import Request from "./request";

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo link">
        <img src="./Spotify_Logo_RGB_White.png" alt="Логотип" width="100%" height="40" max-width="131" />
      </a>
      <Request/>
    </header>
    );
}

export default Header;