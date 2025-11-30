import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router"

import {
  Button,
  PokemonCard,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { usePokemonPage } from "./hooks/usePokemonPage"

export const PokemonPage = () => {
  const { state } = usePokemonPage()

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <PokemonCard className="grid gap-5">
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
              {state.pokemon.img && (
                <PokemonCardImage src={state.pokemon.img} />
              )}
              {!state.pokemon.img && <PokemonCardImageNotFound />}
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
        <Button asChild>
          <Link
            className={cn({
              "pointer-events-none opacity-15":
                state.prevPokemonId === state.pokemon?.id,
            })}
            to={`/pokemon/${state.prevPokemonId}`}
          >
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        <Button asChild>
          <Link
            className={cn(
              cn({
                "pointer-events-none opacity-15":
                  state.nextPokemonId === state.pokemon?.id,
              }),
            )}
            to={`/pokemon/${state.nextPokemonId}`}
          >
            <ArrowRight className="size-6" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
