import React, { FC, useRef, useEffect } from "react";

import { ForceGraph3D } from "react-force-graph";
import { PokemonData } from "./Main";

interface Props {
  pokemons: PokemonData[];
}

interface GraphNode {
  name: string;
  id: string;
  url?: string;
}

interface LinksNode {
  source: string;
  target: string;
}

function getUniqueTypes(pokemons: PokemonData[]) {
  const uniqueTypes: string[] = [];
  pokemons.forEach((pokemon) => {
    if (pokemon.types) {
      pokemon.types.forEach((type) => {
        if (!uniqueTypes.includes(type)) {
          uniqueTypes.push(type);
        }
      });
    }
  });
  return uniqueTypes;
}

const Graph: FC<Props> = ({ pokemons }) => {
  const graphDataPokemons: GraphNode[] = pokemons.map((p) => ({
    name: p.name,
    id: p.name,
    url: p.url,
  }));

  const graphDataTypes: GraphNode[] = getUniqueTypes(pokemons).map((t) => ({
    name: t,
    id: t,
  }));

  const graphData = [...graphDataPokemons, ...graphDataTypes];

  const linksData: LinksNode[] = pokemons
    .filter((p) => p.name !== "pokemons")
    .map((p) => {
      return { source: p.types[0], target: p.name };
    });

  let linksData2: LinksNode[] = [];

  pokemons.forEach((p) => {
    if (p.types) {
      p.types.forEach((element) => {
        console.log({ p });
        linksData2.push({ source: element, target: p.name });
      });
    }
  });

  const linksDataMain: LinksNode[] = graphDataTypes.map((p) => {
    return { source: p.name, target: "pokemons" };
  });

  const colorFn = (node: any) => {
    return "red";
  };

  return (
    <ForceGraph3D
      graphData={{
        nodes: graphData,
        links: [...linksData2, ...linksDataMain],
      }}
      nodeColor={colorFn}
      width={1000}
      height={500}
    />
  );
};

export default Graph;
