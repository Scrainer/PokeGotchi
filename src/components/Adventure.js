import React, { useEffect } from "react";
import FavoriteContext from "../context/favoritesContext";
import {
  getPokemonData,
  getPokemons,
  searchPokemon,
  getSpeciesData,
  getSpecies,
} from "../api";

const { useContext, useState } = React;

const Adventure = (props) => {
  const { legendaries } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const [active, setActive] = useState("No");
  const [capture, setCapture] = useState("");
  const [pokemons, setPokemons] = useState([]);

  const checkTeam = () => {
    const lista = favoritePokemons.filter((x) => x.happiness >= 5);
    if (lista.length >= 6) {
      return true;
    } else {
      return false;
    }
  };

  const captureLegendary = async () => {
    const randomElement = legendaries.map((x) => x.name)[
      Math.floor(Math.random() * legendaries.length)
    ];
    console.log(randomElement);
    const result = await searchPokemon(randomElement, legendaries, true);
    return () => setPokemons(result);
  };

  useEffect(() => {
    if (active === "Ready") {
      captureLegendary();
      return () => setCapture("active");
    }
  }, [active]);


  return (
    <div>
      <div>Are you ready for an Adventure?</div>
      <div>
        <p>
          Looks like your eager to go out and become the best Pokemon Trainer!
          You can venture into the forest as long as you have at least one
          Pokemon companion, and.. who knows, maybe you'll encounter something
          LEGENDARY!
        </p>
      </div>
      <div>
        <button
          onClick={checkTeam() ? () => setActive("Ready") : () => setActive("NotReady")
          }
        >
          Catch'em All!
        </button>
      </div>

      <div>
        {active === "Ready" && (
          <div>
            <h2>You go on great adventure with your team.</h2>
            {capture === "active"&& (
                <h2>You've encountered and captured a {pokemons.name}.</h2>
            )}
          </div>
        )}
        {active === "NotReady" && (
          <div>
            <h1>No estas listo</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adventure;
