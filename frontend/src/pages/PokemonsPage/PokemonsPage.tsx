import { Activity } from "react"

import { SpinnerIcon } from "@/components/icons"
import { PokemonCardName, PokemonCardNumber } from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"

import { PokemonListSkeleton } from "./components/PokemonListSkeleton"
import { PokemonPreviewDialog } from "./components/PokemonPreviewDialog"
import { usePokemonsPage } from "./hooks/usePokemonsPage"

export const PokemonsPage = () => {
  const { state, functions } = usePokemonsPage()

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 pb-14">
      {state.isInfiniteQueryLoading ? (
        <PokemonListSkeleton />
      ) : (
        state.pokemons.map((pokemon, index) => {
          const id = index + 1 >= 1026 ? 9975 + ((index + 1) % 1000) : index + 1

          return (
            <button
              key={id}
              aria-label="Open pokemon preview"
              className="relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-lg border border-zinc-400 px-4 py-3 transition-colors hover:bg-zinc-100"
              title="Open pokemon preview"
              type="button"
              onClick={() => {
                functions.selectPokemon(id)
              }}
            >
              <PokemonCardName className="z-1">{pokemon.name}</PokemonCardName>
              <PokemonCardNumber className="z-1">
                {formatPokemonId(id)}
              </PokemonCardNumber>
            </button>
          )
        })
      )}
      {state.selectedPokemonId && (
        <PokemonPreviewDialog
          onClose={() => functions.selectPokemon(null)}
          pokemonId={state.selectedPokemonId}
        />
      )}
      <Activity mode={state.isFetchingNextPokemonPage ? "visible" : "hidden"}>
        <PokemonListSkeleton />
        <div className="col-span-full mx-auto">
          <SpinnerIcon className="size-12 animate-spin" />
        </div>
      </Activity>
      <Activity mode={state.isFetchingNextPokemonPage ? "hidden" : "visible"}>
        {/* TODO: Возможно стоит подгружать ref не в конце списка, а заранее */}
        <div ref={state.loadMoreRef} />
      </Activity>
    </div>
  )
}
