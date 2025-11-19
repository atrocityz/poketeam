import React from "react"

import {
  PokemonCard,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
} from "@/components/ui"
import { POKEMONS_QUERY_LIMIT } from "@/utils/constants"
import { formatPokemonId } from "@/utils/helpers"

import { Layout } from "../Layout"
import { PokemonPreviewDialog } from "./components/PokemonPreviewDialog"
import { usePokemonsPage } from "./hooks/usePokemonsPage"

export const PokemonsPage = () => {
  const { state, functions } = usePokemonsPage()

  React.useEffect(() => {
    if (state.selectedPokemonId) {
      document.documentElement.style.overflowY = "hidden"
    } else {
      document.documentElement.style.overflowY = "auto"
    }
  }, [state.selectedPokemonId])

  return (
    <Layout>
      <div className="container mx-auto grid grid-cols-4 gap-5 pt-24 pb-14">
        {state.isInfiniteQueryLoading
          ? Array.from({ length: POKEMONS_QUERY_LIMIT }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PokemonCard key={index} className="flex justify-between gap-4">
                <PokemonCardSkeletonName />
                <PokemonCardSkeletonNumber />
              </PokemonCard>
            ))
          : state.pokemons!.map((pokemon, index) => {
              const id = index + 1

              return (
                <PokemonCard
                  key={id}
                  className="cursor-pointer"
                  tabIndex={0}
                  onClick={() => {
                    functions.selectPokemon(id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      functions.selectPokemon(id)
                    }
                  }}
                  role="button"
                >
                  <div className="flex items-center justify-between">
                    <PokemonCardName>{pokemon.name}</PokemonCardName>
                    <PokemonCardNumber>{formatPokemonId(id)}</PokemonCardNumber>
                  </div>
                </PokemonCard>
              )
            })}
        {state.selectedPokemonId && (
          <PokemonPreviewDialog
            onClose={() => functions.selectPokemon(null)}
            pokemonId={state.selectedPokemonId}
          />
        )}
        {state.isFetchingNextPokemonPage ? (
          Array.from({ length: POKEMONS_QUERY_LIMIT }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PokemonCard key={index} className="flex justify-between gap-4">
              <PokemonCardSkeletonName />
              <PokemonCardSkeletonNumber />
            </PokemonCard>
          ))
        ) : (
          <div ref={state.loadMoreRef} />
        )}
      </div>
    </Layout>
  )
}
