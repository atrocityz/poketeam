import type { Pokemon, PokemonType } from "@/../@types/Pokemon/Pokemon"

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
  img: pokemonData.sprites.versions["generation-v"]["black-white"].animated
    .front_default,
  types: pokemonData.types,
})
