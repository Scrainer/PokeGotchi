import React from "react";
import { searchPokemon } from "../api";
const { useState } = React;

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState();

  const onChange = (evt) => {
    setSearch(evt.target.value);
  };

  const onClick = async (evt) => {
    const data = await searchPokemon(search);
    setPokemon(data);
  };

  return (
    <div className="searchbar-container">
      <div className="bar-container">
        <input className="searchbar" onChange={onChange} />
      </div>
      <div className="searchbar-btn">
        <button onClick={onClick}>🔍</button>
      </div>
    </div>
  );
};

export default Searchbar;
