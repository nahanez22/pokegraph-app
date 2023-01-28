import React, { useState, useEffect } from "react";
import axios from "axios";

import dynamic from "next/dynamic";

const DynamicGraph = dynamic(() => import("./Graph"), {
  ssr: false,
});

export interface PokemonData {
  name: string;
  url: string;
  types?: string[];
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

      const pokemonsData = await Promise.all(
        response.data.results.map(async (pokemon: PokemonData) => {
          const typesResponse = await axios.get(pokemon.url);
          return {
            name: typesResponse.data.name,
            types: typesResponse.data.types.map(
              (type: { slot: number; type: { name: string } }) => type.type.name
            ),
            url: pokemon.url,
          };
        })
      );

      setPokemons(pokemonsData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {pokemons.length ? (
        <DynamicGraph pokemons={[...pokemons, { name: "pokemons", url: "" }]} />
      ) : (
        ""
      )}
    </div>
  );
};

export default PoKemonGraph;
