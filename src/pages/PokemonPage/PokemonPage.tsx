import {
  PokemonCard,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
} from "@/components/ui/PokemonCard"
import { formatPokemonId } from "@/utils/helpers"

import { Layout } from "../Layout"
import { usePokemonPage } from "./hooks/usePokemonPage"

export const PokemonPage = () => {
  const { state } = usePokemonPage()

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center">
        <PokemonCard className="grid h-[460px] w-[320px] grid-rows-[240px_1fr] gap-5">
          {state.isLoading && !state.pokemon ? (
            <>
              <PokemonCardSkeletonImage />
              <PokemonCardSkeletonName />
            </>
          ) : state.pokemon ? (
            <>
              <div className="relative">
                <div className="absolute top-0 right-0">
                  {formatPokemonId(state.pokemon.id)}
                </div>
                <PokemonCardImage imgSrc={state.pokemon.img} />
              </div>
              <PokemonCardName>{state.pokemon.name}</PokemonCardName>
            </>
          ) : (
            <div>Pokemon not found...</div>
          )}
        </PokemonCard>
      </div>
    </Layout>
  )
}
