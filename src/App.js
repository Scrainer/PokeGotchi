import React from "react";
import pokedexttop from "./img/pokedex-01.png";
import pokedextbottom from "./img/pokedex-02.png";
import "./App.css";
import Searchbar from "./components/Searchbar";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import Pokedex from "./components/Pokedex";
import Nursery from "./components/Nursery";
import { FavoriteProvider } from "./context/favoritesContext";
import Adventure from "./components/Adventure";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

function App() {
  const nombresLegendarios = [
    "articuno",
    "zapdos",
    "moltres",
    "mewtwo",
    "raikou",
    "entei",
    "suicune",
    "lugia",
    "ho-oh",
    "regirock",
    "regice",
    "registeel",
    "latias",
    "latios",
    "kyogre",
    "groudon",
    "rayquaza",
    "uxie",
    "mesprit",
    "azelf",
    "dialga",
    "palkia",
    "heatran",
    "regigigas",
    "giratina-altered",
    "cresselia",
    "cobalion",
    "terrakion",
    "virizion",
    "tornadus-incarnate",
    "thundurus-incarnate",
    "reshiram",
    "zekrom",
    "landorus-incarnate",
    "kyurem",
    "xerneas",
    "yveltal",
    "zygarde-50",
    "silvally",
    "tapu-koko",
    "tapu-lele",
    "tapu-bulu",
    "tapu-fini",
    "cosmog",
    "cosmoem",
    "solgaleo",
    "lunala",
    "necrozma",
    "zacian",
    "zamazenta",
    "eternatus",
    "kubfu",
    "urshifu-single-strike",
    "regieleki",
    "regidrago",
    "glastrier",
    "spectrier",
    "calyrex",
    "enamorus-incarnate",
    "giratina-origin",
    "tornadus-therian",
    "thundurus-therian",
    "landorus-therian",
    "kyurem-black",
    "kyurem-white",
    "mewtwo-mega-x",
    "mewtwo-mega-y",
    "latias-mega",
    "latios-mega",
    "kyogre-primal",
    "groudon-primal",
    "rayquaza-mega",
    "zygarde-10-power-construct",
    "zygarde-50-power-construct",
    "zygarde-complete",
    "necrozma-dusk",
    "necrozma-dawn",
    "necrozma-ultra",
    "articuno-galar",
    "zapdos-galar",
    "moltres-galar",
    "zygarde-10",
    "zacian-crowned",
    "zamazenta-crowned",
    "eternatus-eternamax",
    "urshifu-rapid-strike",
    "calyrex-ice",
    "calyrex-shadow",
    "urshifu-single-strike-gmax",
    "urshifu-rapid-strike-gmax",
    "dialga-origin",
    "palkia-origin",
    "enamorus-therian",
  ];
  const idxLegendarios = [
    144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382,
    383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640, 641,
    642, 643, 644, 645, 646, 716, 717, 718, 773, 785, 786, 787, 788, 789, 790,
    791, 792, 800, 888, 889, 890, 891, 892, 894, 895, 896, 897, 898, 905, 10007,
    10019, 10020, 10021, 10022, 10023, 10043, 10044, 10062, 10063, 10077, 10078,
    10079, 10118, 10119, 10120, 10155, 10156, 10157, 10169, 10170, 10171, 10181,
    10188, 10189, 10190, 10191, 10193, 10194, 10226, 10227, 10245, 10246, 10249,
  ];
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
    const result = await searchPokemon(pokemon,nombresLegendarios);
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
                    legendaries={nombresLegendarios}
                    indexes={idxLegendarios}
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
            {active === "AdventureScreen" && (
              <div className="screen-adventure">
                <div className="header">
                  <h1>Adventure</h1>
                  <div>&#10084;&#65039; {favorites.length}</div>
                </div>
                <Adventure legendaries={nombresLegendarios} />
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
                <button onClick={() => setActive("AdventureScreen")}>
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
