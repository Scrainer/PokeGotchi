export const searchPokemon = async (pokemon) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fallo el fetch");
  }
};

export const getPokemons = async (limit, offset) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit=1}&offset=${offset=0}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fallo el fetch");
  }
};

export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fallo el fetch");
  }
};

