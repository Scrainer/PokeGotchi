import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";

const Pokemon = (props) => {
  const { pokemon } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const redHeart = "❤️";
  const blackHeart = "🖤";
  const heart = favoritePokemons.map((x) => x.name).includes(pokemon.name)
    ? redHeart
    : blackHeart;

  const clickHeart = (e) => {
    e.preventDefault();
    updateFavoritePokemons(pokemon, false);
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-img-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-img"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h1>
            No.{pokemon.id} {pokemon.name}
          </h1>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            <h2>TYPE</h2>
            {pokemon.types.map((type, idx) => {
              return (
                <div key={idx} className="pokemon-type-text">
                  <h2>{type.type.name}</h2>
                </div>
              );
            })}
          </div>
          <div className="pokemon-data">
            <h2>HEIGHT</h2>
            <div><h2>{pokemon.height} dm.</h2></div>
          </div>
           <div className="pokemon-data">
            <h2>WEIGHT</h2>
            <div><h2>{pokemon.weight} hg.</h2></div>
          </div>

          <button onClick={clickHeart} className="pokemon-heart-btn">
            <div className="pokemon-favorite">{heart}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
