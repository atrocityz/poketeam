import type { Pokemon, PokemonType } from "@/../@types/pokeapi"

interface PokemonEntity {
  id: Pokemon["id"]
  img: string
  name: string
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
})
