import React from "react";
import Pagination from "./Pagination";
import Tamed from "./Tamed";
import { ScrollView, SafeAreaView } from 'react-native';
const { useState, useEffect } = React;

const Nursery = (props) => {
  const { pokemons } = props;
  const [page, setPage] = useState(0);
  const total = Math.ceil(pokemons.length/6);
  const [results, setResults] = useState([]);

  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };

  const nextPage = () => {
    const nextPage = Math.min(page + 1, total - 1);
    setPage(nextPage);
  };

  useEffect(() => {
      setResults(pokemons.slice(0+(6*page),6+(6*page),))
  }, [page]);

  return (
    <div>
      <Pagination
          page={page+1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
          <div className="nursery-grid">
            {results.map((pokemon, idx) => {
              return <Tamed pokemon={pokemon} key={pokemon.name} />;
            })}
          </div>
    </div>
  );
};

export default Nursery;
