import React, { useState } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  types: string[];
  id: number;
}

const PoKemonGraph: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  return <div>Hola</div>;
};

export default PoKemonGraph;
