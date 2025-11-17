import {
  PokemonCard,
  PokemonCardName,
  PokemonCardSkeletonName,
} from "@/components/ui/PokemonCard"
import { POKEMONS_QUERY_LIMIT } from "@/utils/constants"
import { formatPokemonId } from "@/utils/helpers"

import { Layout } from "../Layout"
import { PokemonPopup } from "./components/PokemonPopup"
import { usePokemonsPage } from "./hooks/usePokemonsPage"

export const PokemonsPage = () => {
  const { state, functions } = usePokemonsPage()

  return (
    <Layout>
      <div className="container mx-auto grid grid-cols-4 gap-5 pt-24">
        {state.isLoading
          ? Array.from({ length: POKEMONS_QUERY_LIMIT }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PokemonCard key={index}>
                <PokemonCardSkeletonName />
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
                    {formatPokemonId(id)}
                  </div>
                </PokemonCard>
              )
            })}
        {state.selectedPokemonId && (
          <PokemonPopup
            onClose={() => functions.selectPokemon(null)}
            pokemonId={state.selectedPokemonId}
          />
        )}
        <div ref={state.loadMoreRef} />
      </div>
    </Layout>
  )
}
