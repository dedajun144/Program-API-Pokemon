import { useEffect, useState } from "react";

import PokemonThumnails from "./components/PokemonThumnails";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon?limit=30`);

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    //if (res.ok == false) return console.log("gagal");
    const data = await res.json();
    //console.log(data);
    setLoadMore(data.next);

    function cretePokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    cretePokemonObject(data.results);
    //await console.log(allPokemons);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <div className="app-contaner">
      <h1>Pokemon Evolutions</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonThumnails id={pokemonStats.id} name={pokemonStats.name} image={pokemonStats.sprites.other.dream_world.front_default} type={pokemonStats.types[0].type.name} key={index} />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;
