import React from "react";
import pokedexttop from "./img/pokedex-01.png";
import pokedextbottom from "./img/pokedex-02.png";
import "./App.css";
import Searchbar from "./components/Searchbar";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import Pokedex from "./components/Pokedex";
import Nursery from "./components/Nursery";
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
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(1, 1 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 1));
      setNotFound(false);
    } catch (err) {}
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
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (pokemon, isCandy) => {
    const updated = [...favorites];
    const isFavorite = updated.map((x) => x.name).indexOf(pokemon.name);
    if (!isCandy) {
      if (isFavorite >= 0) {
        updated.splice(isFavorite, 1);
      } else {
        pokemon.happiness = Math.floor(Math.random() * 5);
        updated.push(pokemon);
      }
    } else {
      pokemon.happiness += 1;
      console.log(pokemon);
      updated.splice(isFavorite, 1, pokemon);
    }

    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
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
        {console.log(pokemons)}
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
                  <div>&#10084;&#65039; {favorites.length}</div>
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
                  <div>&#10084;&#65039; {favorites.length}</div>
                </div>
                <Nursery pokemons={favorites} />
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
