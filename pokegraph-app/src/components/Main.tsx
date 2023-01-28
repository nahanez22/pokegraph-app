import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph";

export interface PokemonData {
  name: string;
  url: string;
}

interface PokemonDataAxios {
  count: number;
  next: string;
  previus: string | null;
  results: PokemonData[];
}

const PoKemonGraph: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get<PokemonDataAxios>(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      setPokemons(response.data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Graph pokemons={pokemons} />
      <p>Loading...</p>
    </div>
  );
};

export default PoKemonGraph;
