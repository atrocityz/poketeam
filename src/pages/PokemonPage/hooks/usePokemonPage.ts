import { useParams } from "react-router"

import { useRequestPokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const requestPokemonQuery = useRequestPokemonQuery({
    id: +(params.pokemonId as string),
  })

  const pokemon =
    requestPokemonQuery.data &&
    dbPokemonToPokemonEntity(requestPokemonQuery.data.data)

  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  const nextPokemonId = pokemon && pokemon.id + 1

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: requestPokemonQuery.isLoading,
      prevPokemonId,
      nextPokemonId,
    },
  }
}
