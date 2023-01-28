import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph";

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
    }
    fetchData();
  }, []);

  return (
    <div>
      <Graph />
      <p>Loading...</p>
    </div>
  );
};

export default PoKemonGraph;
