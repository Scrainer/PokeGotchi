import React from "react";
import logo from "./logo.svg";
import pokedexttop from "./img/pokedex-01.png";
import pokedextbottom from "./img/pokedex-02.png";
import "./App.css";
import Pokedex from "./components/Pokedex";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { getPokemonData, getPokemons } from "./api";

const { useState, useEffect } = React;

function App() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results)
    } catch (error) {}
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <div className="left-container"></div>
      <div className="pokedex-container">
        <div className="top-pokedex">
          <img src={pokedexttop} />
        </div>
        <div className="screen-pokedex">
          <Searchbar />
          <Pokedex pokemons={pokemons} />
          <Navbar />
        </div>
        <div className="bottom-pokedex">
          <img src={pokedextbottom} />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}

export default App;
