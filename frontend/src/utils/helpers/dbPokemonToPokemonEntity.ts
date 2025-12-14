import type { Pokemon, PokemonStat, PokemonType } from "@/../@types/pokeapi"

interface PokemonEntity {
  id: Pokemon["id"]
  img: string
  name: string
  stats: PokemonStat[]
  types: PokemonType[]
}

export const dbPokemonToPokemonEntity = (
  pokemonData: Pokemon,
): PokemonEntity => ({
  name: pokemonData.name,
  id: pokemonData.id,
  img:
    pokemonData.sprites.versions["generation-v"]["black-white"].animated
      .front_default ?? pokemonData.sprites.front_default,
  types: pokemonData.types,
  stats: [
    ...pokemonData.stats.sort(
      (a, b) => a.stat.name.length - b.stat.name.length,
    ),
    {
      base_stat: pokemonData.height,
      effort: 0,
      stat: {
        name: "height",
        url: "",
      },
    },
    {
      base_stat: pokemonData.weight,
      effort: 0,
      stat: {
        name: "weight",
        url: "",
      },
    },
  ],
})
