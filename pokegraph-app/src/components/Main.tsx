import React, { useState, useEffect } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  types: string[];
  id: number;
}

const PoKemonGraph: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      setPokemons(
        response.data.results.map((pokemon: any) => ({
          name: pokemon.name,
          types: pokemon.types.map((type: any) => type.type.name),
          id: pokemon.id,
        }))
      );
    }
    fetchData();
  }, []);

  return (
    <div>
      {pokemons.length > 0 ? <Graph pokemons={pokemons} /> : <p>Loading...</p>}
    </div>
  );
};

export default PoKemonGraph;
