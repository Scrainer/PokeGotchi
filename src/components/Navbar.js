import React from "react";
import FavoriteContext from "../context/favoritesContext";

const {useContext} = React;

const Navbar = () => {
  const {favoritePokemons} = useContext(FavoriteContext);
  return (
    <nav>
      <div>
        <button>Pokedex</button>
        <button>Nursery</button>
        <button>Adventure</button>
      </div>
      <div>&#10084;&#65039; {favoritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;
