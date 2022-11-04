import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons, page, setPage, total, loading, legendaries,indexes } = props;

  const lastPage = () => {
    let nextPage = Math.max(page - 1, 0);
    while (Array.from(indexes).includes(nextPage)){
      nextPage = nextPage -1
    }
    setPage(nextPage);
  };

  const nextPage = () => {
    let nextPage = Math.min(page + 1, total - 1);
    while (Array.from(indexes).includes(nextPage)){
      nextPage = nextPage +1
    }
    setPage(nextPage);
  };

  return (
    <div>
      {loading ? (
        <div>Cargando pokemones...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, idx) => {
            return <Pokemon pokemon={pokemon} key={pokemon.name} />;
          })}
        </div>
      )}
      <div className="pagination-footer">
        <Pagination
          page={page + 1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
    </div>
  );
};

export default Pokedex;

