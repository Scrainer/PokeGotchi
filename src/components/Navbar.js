import React from "react";
import FavoriteContext from "../context/favoritesContext";

const {useContext} = React;

const Navbar = () => {
  const {favoritePokemons} = useContext(FavoriteContext);
  let imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img alt="pokeapi-logo" src={imgUrl} className="navbar-logo"></img>
      </div>
      <div>&#10084;&#65039; {favoritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;
