export const searchPokemon = async (pokemon, legendaries, ready=false) => {
  try {
    if (ready) {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } else {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(url);
      const data = await response.json();
      const lista = legendaries.map((x) => x.name);
      if (legendaries.includes(data.species.name)) {
        data = null;
      }

      return data;
    }
  } catch (error) {}
};

export const getPokemons = async (limit = 25, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const getSpecies = async (limit = 1000, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const getSpeciesData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {}
};
