import React from "react"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"
import type { NamedApiResource } from "@/../@types/Utility/NamedApiResourceList"

import { useGetPokemonInfiniteQuery } from "@/utils/api/hooks"
import { POKEMONS_QUERY } from "@/utils/constants/pokemon"
import { useInView } from "@/utils/hooks"

export const usePokemonsPage = () => {
  const pokemonInfiniteQuery = useGetPokemonInfiniteQuery({
    limit: POKEMONS_QUERY.LIMIT,
    offset: POKEMONS_QUERY.OFFSET,
  })
  const { ref, isInView } = useInView()
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<
    Pokemon["id"] | null
  >(null)

  const pokemons = pokemonInfiniteQuery.data?.pages.reduce(
    (array: NamedApiResource[], page) => [...array, ...page.data.results],
    [],
  )

  const selectPokemon = (id: Pokemon["id"] | null) => setSelectedPokemonId(id)

  React.useEffect(() => {
    if (isInView) {
      pokemonInfiniteQuery.fetchNextPage()
    }
  }, [isInView])

  return {
    state: {
      pokemons,
      selectedPokemonId,
      isInfiniteQueryLoading: pokemonInfiniteQuery.isPending,
      loadMoreRef: ref,
      isFetchingNextPokemonPage: pokemonInfiniteQuery.isFetchingNextPage,
    },
    functions: {
      selectPokemon,
    },
  }
}
