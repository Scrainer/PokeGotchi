import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons , loading} = props;



  return (
    <div>
      <div className="header">
        <h1>Pokedex</h1>
      </div>
      {loading ? <div>Cargando pokemones...</div> 
      : 
      <div className="pokedex-grid">
        {pokemons.map((pokemon, idx) => {
          return <Pokemon pokemon={pokemon} key={pokemon.name} />;
        })}
      </div>
      }
    </div>
  );
};

export default Pokedex;
