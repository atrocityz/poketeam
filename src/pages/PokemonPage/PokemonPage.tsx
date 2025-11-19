import { Link } from "react-router"

import {
  PokemonCard,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { Layout } from "../Layout"
import { usePokemonPage } from "./hooks/usePokemonPage"

export const PokemonPage = () => {
  const { state } = usePokemonPage()

  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center gap-6">
        <PokemonCard className="grid h-[460px] w-[320px] grid-rows-[280px_1fr] gap-5">
          {!state.pokemon || state.isPokemonQueryLoading ? (
            <>
              <PokemonCardSkeletonImage />
              <PokemonCardContent>
                <PokemonCardSkeletonNumber />
                <PokemonCardSkeletonName />
              </PokemonCardContent>
            </>
          ) : (
            <>
              <div className="relative flex shrink-0 justify-center">
                <PokemonCardImage className="" imgSrc={state.pokemon.img} />
                <PokemonCardTypes
                  className="absolute top-0 left-0"
                  types={state.pokemon.types}
                />
              </div>
              <PokemonCardContent>
                <PokemonCardNumber>
                  {formatPokemonId(state.pokemon.id)}
                </PokemonCardNumber>
                <PokemonCardName>{state.pokemon.name}</PokemonCardName>
              </PokemonCardContent>
            </>
          )}
        </PokemonCard>

        <div className="flex gap-4">
          <Link
            className={cn({
              "pointer-events-none opacity-15":
                state.prevPokemonId === state.pokemon?.id,
            })}
            to={`/pokemon/${state.prevPokemonId}`}
          >
            Prev
          </Link>
          <Link
            className={cn({
              "pointer-events-none opacity-15": !state.nextPokemonId,
            })}
            to={`/pokemon/${state.nextPokemonId}`}
          >
            Next
          </Link>
        </div>
      </div>
    </Layout>
  )
}
