import { ArrowLeft, ArrowRight } from "lucide-react"
import React from "react"
import { Link } from "react-router"

import {
  Button,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardMotion,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { useMotionCardTiltAnimation } from "./hooks/useMotionCardTiltAnimation"
import { usePokemonPage } from "./hooks/usePokemonPage"

export const PokemonPage = () => {
  const { state } = usePokemonPage()
  const { handleMouseLeave, handleMouseMove, rotateX, rotateY } =
    useMotionCardTiltAnimation()

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <PokemonCardMotion
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className="grid gap-5"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{
          scale: 1.05,
        }}
      >
        {!state.pokemon || state.isPokemonQueryLoading ? (
          <>
            <PokemonCardSkeletonImage />
            <PokemonCardContent>
              <PokemonCardSkeletonNumber />
              <PokemonCardSkeletonName />
            </PokemonCardContent>
          </>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </PokemonCardMotion>

      <div className="flex gap-4">
        <Button asChild>
          <Link
            className={cn({
              "pointer-events-none opacity-15": !state.hasPrevPokemon,
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
                "pointer-events-none opacity-15": !state.hasNextPokemon,
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
