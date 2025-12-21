import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router"

import {
  Button,
  LoaderSwap,
  PokemonCard,
  PokemonCardBackgroundImage,
  PokemonCardContent,
  PokemonCardHeader,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardMotion,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonBackground,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardStatItem,
  PokemonCardStats,
  PokemonCardStatsSkeleton,
  PokemonCardTypes,
} from "@/components/ui"
import { routes } from "@/utils/config"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { useMotionCardTiltAnimation } from "./hooks/useMotionCardTiltAnimation"
import { usePokemonPage } from "./hooks/usePokemonPage"

export const PokemonPage = () => {
  const { state, functions } = usePokemonPage()
  const { handleMouseLeave, handleMouseMove, rotateX, rotateY } =
    useMotionCardTiltAnimation()

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="mx-auto flex max-w-fit min-w-full flex-col items-center gap-8 pt-4 md:min-w-[380px]"
    >
      {(!state.pokemon || state.isPokemonQueryLoading) && (
        <PokemonCard className="min-w-full">
          <PokemonCardSkeletonBackground />
          <PokemonCardContent>
            <PokemonCardHeader>
              <PokemonCardSkeletonNumber />
              <PokemonCardSkeletonName />
            </PokemonCardHeader>
            <PokemonCardStatsSkeleton />
          </PokemonCardContent>
        </PokemonCard>
      )}
      {state.pokemon && !state.isPokemonQueryLoading && (
        <PokemonCardMotion
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          className="min-w-full"
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
          <PokemonCardBackgroundImage className="relative flex shrink-0 justify-center">
            {state.pokemon.img && <PokemonCardImage src={state.pokemon.img} />}
            {!state.pokemon.img && <PokemonCardImageNotFound />}
            <PokemonCardTypes
              className="absolute top-0 left-0"
              types={state.pokemon.types}
            />
          </PokemonCardBackgroundImage>
          <PokemonCardContent>
            <PokemonCardHeader>
              <PokemonCardNumber>
                {formatPokemonId(state.pokemon.id)}
              </PokemonCardNumber>
              <PokemonCardName>{state.pokemon.name}</PokemonCardName>
            </PokemonCardHeader>
            <PokemonCardStats>
              {state.pokemon.stats.map((stat) => (
                <PokemonCardStatItem key={stat.stat.name} stat={stat} />
              ))}
            </PokemonCardStats>
          </PokemonCardContent>
        </PokemonCardMotion>
      )}

      {state.isPokemonInTeam ? (
        <Button
          disabled={
            state.isPutTeamMutationLoading ||
            state.isPokemonQueryLoading ||
            state.isGetTeamQueryLoading
          }
          className="w-full uppercase"
          size="lg"
          variant="destructive"
          onClick={() => {
            if (!state.pokemon) return
            functions.removePokemonFromTeam(state.pokemon.id)
          }}
        >
          <LoaderSwap
            isLoading={
              state.isPutTeamMutationLoading || state.isGetTeamQueryLoading
            }
          >
            Remove from team
          </LoaderSwap>
        </Button>
      ) : (
        <Button
          disabled={
            state.isPutTeamMutationLoading ||
            state.isTeamFull ||
            state.isPokemonQueryLoading ||
            state.isGetTeamQueryLoading
          }
          className="w-full uppercase"
          size="lg"
          onClick={() => {
            if (!state.pokemon) return
            functions.addPokemonToTeam(state.pokemon)
          }}
        >
          <LoaderSwap
            isLoading={
              state.isPutTeamMutationLoading || state.isGetTeamQueryLoading
            }
          >
            {state.isTeamFull ? "Team is full!" : "Add to team"}
          </LoaderSwap>
        </Button>
      )}

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link
            className={cn({
              "pointer-events-none opacity-15": !state.hasPrevPokemon,
            })}
            to={routes.pokemon.getHref(state.prevPokemonId!)}
          >
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link
            className={cn(
              cn({
                "pointer-events-none opacity-15":
                  !state.hasNextPokemon || state.isLastPokemonIdLoading,
              }),
            )}
            to={routes.pokemon.getHref(state.nextPokemonId!)}
          >
            <ArrowRight className="size-6" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
