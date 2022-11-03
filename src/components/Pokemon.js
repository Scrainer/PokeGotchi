import React from "react";

const Pokemon = (props) => {
  const { pokemon } = props;
  return (
    <div className="pokemon-card">
      <div className="pokemoncard-info">
        <div className="pokemoncard-img">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="pokemoncard-data">
          <div>
            <h2>No.{pokemon.id} {pokemon.name}</h2>
          </div>
          <div className="pokemoncard-type">
            {pokemon.types.map((type, idx) => {
              return <h2 className="pokemoncard-typetext" key={idx}>{type.type.name}</h2>;
            })}
          </div>
          <div><h2>Height:  {pokemon.height} dm.</h2></div>
          <div><h2>Weight:  {pokemon.weight} hg.</h2></div>
        </div>
      </div>
      <div className="pokemon-descriptioncard">
        <div>Descripcion del pokemon</div>
        <div>⚫</div>
      </div>
    </div>
  );
};

export default Pokemon;