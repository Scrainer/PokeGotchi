import React from "react";
import pokedexttop from "./img/pokedex-01.png";
import pokedextbottom from "./img/pokedex-02.png";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./context/favoritesContext";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

function App() {
  const [active, setActive] = useState("PokedexScreen");
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching,setSearching] = useState(false);

  const fetchPokemons = async (value) => {
    try {
      setLoading(true);
      const data = await getPokemons(value, value * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / value));
      setNotFound(false);
    } catch (error) {}
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if (!searching) {
      if (active === "NurseryScreen"){
        fetchPokemons(6);
      } else {
      fetchPokemons(1);
      }
    }
    
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons(1);
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };


  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div className="App">
        <div className="left-container"></div>
        <div className="pokedex-container">
          <div className="top-pokedex">
            <img src={pokedexttop} />
          </div>

          <div className="screen">
            {active === "PokedexScreen" && (
              <div className="screen-pokedex">
                <div className="header">
                  <h1>Pokedex</h1>
                  <Searchbar onSearch={onSearch} />
                </div>
                {notFound ? (
                  <div className="not-found-text">
                    No se encontro el Pokemon que buscabas 😭
                  </div>
                ) : (
                  <Pokedex
                    loading={loading}
                    pokemons={pokemons}
                    page={page}
                    setPage={setPage}
                    total={total}
                  />
                )}
              </div>
            )}
            {active === "NurseryScreen" && (
              <div className="screen-nursery">
              <div className="header">
                <h1>Nursery</h1>
                <Searchbar onSearch={onSearch} />
              </div>
              {notFound ? (
                <div className="not-found-text">
                  No se encontro el Pokemon que buscabas 😭
                </div>
              ) : (
                <Pokedex
                  loading={loading}
                  pokemons={pokemons}
                  page={page}
                  setPage={setPage}
                  total={total}
                />
              )}
            </div>
            )}
            <nav>
              <div className="nav-btns">
                <button onClick={() => setActive("PokedexScreen")}>
                  Pokedex
                </button>
                <button onClick={() => setActive("NurseryScreen")}>
                  Nursery
                </button>
                <button onClick={() => setActive("PokedexScreen")}>
                  Adventure
                </button>
              </div>
              <div>&#10084;&#65039; {favorites.length}</div>
            </nav>
          </div>

          <div className="bottom-pokedex">
            <img src={pokedextbottom} />
          </div>
        </div>
        <div className="right-container"></div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
