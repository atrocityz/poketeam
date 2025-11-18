import React from "react"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"
import type { NamedApiResource } from "@/../@types/Utility/NamedApiResourceList"

import { usePokemonInfiniteQuery } from "@/utils/api/hooks"
import { POKEMONS_QUERY_LIMIT } from "@/utils/constants/pokemon"
import { useInView } from "@/utils/hooks"

export const usePokemonsPage = () => {
  const {
    data: infiniteQueryData,
    isPending: isInfiniteQueryPending,
    fetchNextPage: fetchNextInfiniteQueryPage,
    isFetchingNextPage: isFetchingNextInfiniteQueryPage,
  } = usePokemonInfiniteQuery({
    limit: POKEMONS_QUERY_LIMIT,
  })
  const { ref, isInView } = useInView()
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<
    Pokemon["id"] | null
  >(null)

  const pokemons = infiniteQueryData?.pages.reduce(
    (array: NamedApiResource[], page) => [...array, ...page.data.results],
    [],
  )

  const selectPokemon = (id: Pokemon["id"] | null) => setSelectedPokemonId(id)

  React.useEffect(() => {
    if (isInView) {
      fetchNextInfiniteQueryPage()
    }
  }, [isInView])

  return {
    state: {
      pokemons,
      selectedPokemonId,
      isInfiniteQueryLoading: isInfiniteQueryPending,
      loadMoreRef: ref,
      isFetchingNextInfiniteQueryPage,
    },
    functions: {
      selectPokemon,
    },
  }
}
