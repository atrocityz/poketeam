import { motion } from "motion/react"
import React, { Activity } from "react"

import { SpinnerIcon } from "@/components/icons"
import { PokemonCardName, PokemonCardNumber } from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"

import { PokemonListSkeleton } from "./components/PokemonListSkeleton/PokemonListSkeleton"
import { PokemonPreviewDialog } from "./components/PokemonPreviewDialog/PokemonPreviewDialog"
import { usePokemonsPage } from "./hooks/usePokemonsPage"

export const PokemonsPage = () => {
  const { state, functions, refs } = usePokemonsPage()

  return (
    <React.Fragment>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 pb-14">
        {state.isInfiniteQueryLoading && <PokemonListSkeleton />}
        {!state.isInfiniteQueryLoading &&
          state.pokemons.map((pokemon) => (
            <motion.button
              key={pokemon.name}
              animate={{ opacity: 1, y: 0 }}
              aria-label="Open pokemon preview"
              className="hover:bg-accent border-accent-foreground/15 relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-lg border px-4 py-3 transition-colors"
              initial={{ opacity: 0, y: -10 }}
              title="Open pokemon preview"
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                functions.selectPokemon(pokemon.id)
              }}
              transition={{
                duration: 0.2,
              }}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <PokemonCardName
                className="z-1 max-w-40 truncate"
                title={pokemon.name}
              >
                {pokemon.name}
              </PokemonCardName>
              <PokemonCardNumber className="z-1">
                {formatPokemonId(pokemon.id)}
              </PokemonCardNumber>
            </motion.button>
          ))}
        <Activity mode={state.isFetchingNextPokemonPage ? "visible" : "hidden"}>
          <PokemonListSkeleton />
          <div className="col-span-full justify-self-center">
            <SpinnerIcon className="size-12 animate-spin" />
          </div>
        </Activity>
      </div>
      <Activity mode={state.isFetchingNextPokemonPage ? "hidden" : "visible"}>
        <div ref={refs.loadMoreRef} className="-mt-[400px]" />
      </Activity>
      {state.selectedPokemonId && (
        <PokemonPreviewDialog
          isOpen={!!state.selectedPokemonId}
          onClose={() => functions.selectPokemon(null)}
          pokemonId={state.selectedPokemonId}
        />
      )}
    </React.Fragment>
  )
}
