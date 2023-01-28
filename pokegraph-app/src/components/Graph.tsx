import React from "react";
import ForceGraph3D from "react-force-graph";
import Main, { PokemonData } from "./Main";

interface Props {
  pokemons: PokemonData[];
}

const Graph: React.FC<Props> = ({ pokemons }) => {
  console.log({ pokemons });

  return <p>Hola desde Graph</p>;
};

export default Graph;
