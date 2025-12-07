import { useParams } from "react-router"

import { useGetPokemonQuery } from "@/utils/api/hooks"
import { POKEMONS } from "@/utils/constants"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const pokemonQuery = useGetPokemonQuery({
    id: +(params.pokemonId as string),
  })

  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)

  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  const nextPokemonId =
    pokemon && Math.min(pokemon.id + 1, POKEMONS.LAST_POKEMON_ID)

  const hasPrevPokemon = prevPokemonId !== pokemon?.id
  const hasNextPokemon = nextPokemonId !== pokemon?.id

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
      prevPokemonId,
      nextPokemonId,
      hasPrevPokemon,
      hasNextPokemon,
    },
  }
}
