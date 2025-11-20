import React from "react"

import {
  PokemonCard,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
} from "@/components/ui"
import { POKEMONS_QUERY } from "@/utils/constants"
import { formatPokemonId } from "@/utils/helpers"

import { Layout } from "../Layout"
import { PokemonPreviewDialog } from "./components/PokemonPreviewDialog"
import { usePokemonsPage } from "./hooks/usePokemonsPage"

export const PokemonsPage = () => {
  const { state, functions } = usePokemonsPage()

  // TODO: Вынести логику скрытия скролла в модалку PokemonPreviewDialog
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
        {/* TODO: Вынести повторение отрисовки скелета в отдельный компонент??? */}
        {state.isInfiniteQueryLoading
          ? Array.from({ length: POKEMONS_QUERY.LIMIT }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PokemonCard key={index} className="flex justify-between gap-4">
                <PokemonCardSkeletonName />
                <PokemonCardSkeletonNumber />
              </PokemonCard>
            ))
          : state.pokemons!.map((pokemon, index) => {
              const id = index + 1

              return (
                <button
                  key={id}
                  aria-label="Open pokemon preview"
                  className="relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-lg border border-zinc-400 px-4 py-3 hover:animate-pulse"
                  title="Open pokemon preview"
                  type="button"
                  onClick={() => {
                    functions.selectPokemon(id)
                  }}
                >
                  <PokemonCardName className="z-1">
                    {pokemon.name}
                  </PokemonCardName>
                  <PokemonCardNumber className="z-1">
                    {formatPokemonId(id)}
                  </PokemonCardNumber>
                </button>
              )
            })}
        {state.selectedPokemonId && (
          <PokemonPreviewDialog
            onClose={() => functions.selectPokemon(null)}
            pokemonId={state.selectedPokemonId}
          />
        )}
        {state.isFetchingNextPokemonPage ? (
          Array.from({ length: POKEMONS_QUERY.LIMIT }).map((_, index) => (
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
