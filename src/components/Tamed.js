import React from "react";
import FavoriteContext from "../context/favoritesContext";

const {useContext} = React;

const Tamed = (props) => {
  const { pokemon } = props;


  return (
    <div className="pokemon-card">
      <div className="pokemon-img">
        <img
          src={
            pokemon.sprites.front_default
          }
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
        <div>Happiness: {pokemon.happyness}</div>
          <div className="pokemon-type">
            {pokemon.types.map((type, idx) => {
              return (
                <div key={idx} className="pokemon-type-text">
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tamed;
