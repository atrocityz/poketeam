import { useParams } from "react-router"

import { useGetPokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const pokemonQuery = useGetPokemonQuery({
    id: +(params.pokemonId as string),
  })

  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)

  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  // TODO: Проблема с зависимости от числа 10303, нужно как-то отталкиваясь от сервера понять, какой покемон последний
  const nextPokemonId = pokemon && Math.min(pokemon.id + 1, 10303)

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
      prevPokemonId,
      nextPokemonId,
    },
  }
}
