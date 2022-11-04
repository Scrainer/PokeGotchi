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
    const randomElement = legendaries[Math.floor(Math.random() * legendaries.length)];
    console.log(favoritePokemons.map((x) => x.name))
    if ((favoritePokemons.map((x) => x.name)).includes(randomElement.name)){
        console.log()
    }
    console.log(randomElement);
    const result = await searchPokemon(randomElement, legendaries, true);
    updateFavoritePokemons(result,false);
    console.log(result);
    
  };

  const capturePokemon = async () => {
    updateFavoritePokemons(capture,false);
  };

  useEffect(() => {
    if (active === "Ready") {
      captureLegendary();
      return () => setCapture("active");
    }
  }, [active]);


  return (
    <div className="prompt">
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="pokeball"/>
        </button>
      </div>

      <div>
        {active === "Ready" && (
          <div>
            <h2>You go on great adventure with your team and encounter a Legendary Pokemon</h2>
          </div>
        )}
        {active === "NotReady" && (
          <div>
            <h2>You go on a somewhat normal adventure, maybe you need to capture more Pokemons or spend more time with them</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adventure;
