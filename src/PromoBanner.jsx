import './App.css'
import { useEffect, useState } from 'react';

function PromoBanner(props) {
  const [pokemonNames, setPokemonNames] = useState([]);
  useEffect(() => {
    async function getPokemonCards() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      try {
        const res = await fetch(url, options);
        const result = await res.json();
        setPokemonNames(result?.results);
      } catch (err) {
        console.error(err);
      }
    }
    getPokemonCards();
  }, []);

  return (
    <>
      <h1>{props.name}</h1>
      <label>
          Pokemon cards
      </label>
      <ul>
        {pokemonNames.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  )
}

export default PromoBanner
