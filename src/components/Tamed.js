import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";

const Tamed = (props) => {
  const { pokemon } = props;
  const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext);

  const candy = "🍬";

  const clickCandy = (e) => {
    e.preventDefault();
    updateFavoritePokemons(pokemon,true);
  
  };

  return (
    
    <div className="pokemon-card">
      <div className="pokemon-img">
        <img src={pokemon.sprites.front_default} />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div>Happiness: {pokemon.happiness}</div>
          <div className="pokemon-type">
            {pokemon.types.map((type, idx) => {
              return (
                <div key={idx} className="pokemon-type-text">
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <button onClick={clickCandy} className="pokemon-heart-btn">
            <div className="pokemon-favorite">{candy}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tamed;
