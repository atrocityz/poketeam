import { useEffect, useMemo, useState } from "react"

import type { Pokemon } from "@/../@types/pokeapi"

import { useGetPokemonInfiniteQuery } from "@/utils/api/hooks"
import { POKEMONS_QUERY } from "@/utils/constants/pokemon"
import { getPokemonIdFromUrl } from "@/utils/helpers"
import { useInView } from "@/utils/hooks"

export const usePokemonsPage = () => {
  const pokemonInfiniteQuery = useGetPokemonInfiniteQuery({
    limit: POKEMONS_QUERY.LIMIT,
    offset: POKEMONS_QUERY.OFFSET,
  })
  const { ref: loadMoreRef, isInView } = useInView()
  const [selectedPokemonId, setSelectedPokemonId] = useState<
    Pokemon["id"] | null
  >(null)

  const pokemons = useMemo(
    () =>
      pokemonInfiniteQuery.data?.pages.flatMap(({ data }) => {
        return data.results.map((item) => ({
          ...item,
          id: getPokemonIdFromUrl(item.url),
        }))
      }) ?? [],
    [pokemonInfiniteQuery.data?.pages],
  )

  const selectPokemon = (id: Pokemon["id"] | null) => setSelectedPokemonId(id)

  useEffect(() => {
    if (isInView) {
      pokemonInfiniteQuery.fetchNextPage()
    }
  }, [isInView])

  return {
    refs: {
      loadMoreRef,
    },
    state: {
      pokemons,
      selectedPokemonId,
      isInfiniteQueryLoading: pokemonInfiniteQuery.isPending,
      isFetchingNextPokemonPage: pokemonInfiniteQuery.isFetchingNextPage,
      showLoadMore:
        !pokemonInfiniteQuery.isPending &&
        !pokemonInfiniteQuery.isFetchingNextPage,
    },
    functions: {
      selectPokemon,
    },
  }
}
