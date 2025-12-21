import { SquareArrowOutUpRight, X } from "lucide-react"
import { Link } from "react-router"

import {
  Button,
  PokemonCard,
  PokemonCardContent,
  PokemonCardHeader,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { routes } from "@/utils/config"
import { formatPokemonId } from "@/utils/helpers"

import { useTeamPage } from "./hooks/useTeamPage"

export const TeamPage = () => {
  const { functions, state } = useTeamPage()

  return (
    <div className="grid gap-5 pb-8 md:pb-14">
      <div className="grid gap-1">
        <h1 className="text-2xl">My Team</h1>
        <p className="text-muted-foreground">
          Your team is displayed here (maximum of 6 Pokemon)
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] place-items-center justify-items-center gap-3">
        {state.pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            className="hover:bg-muted/40 has-[a:focus-visible]:border-accent relative transition-colors has-[a:focus-visible]:outline-white"
          >
            <div className="relative flex shrink-0 justify-center">
              {pokemon.img && (
                <PokemonCardImage className="h-50 w-50" src={pokemon.img} />
              )}
              {!pokemon.img && (
                <PokemonCardImageNotFound className="h-50 w-50" />
              )}
              <PokemonCardTypes
                className="absolute top-0 left-0 z-1"
                types={pokemon.types}
              />
            </div>
            <PokemonCardContent className="z-1 flex flex-row justify-between">
              <PokemonCardHeader className="not-last:border-none not-last:pb-0">
                <PokemonCardNumber>
                  {formatPokemonId(pokemon.id)}
                </PokemonCardNumber>
                <PokemonCardName>{pokemon.name}</PokemonCardName>
              </PokemonCardHeader>
              <Link
                aria-label="Go to this pokemon page"
                className="inline-flex items-center justify-center rounded-xl transition-colors outline-none after:absolute after:inset-0"
                title="Go to this pokemon page"
                to={routes.pokemon.getHref(pokemon.id)}
              >
                <SquareArrowOutUpRight className="size-5" />
              </Link>
            </PokemonCardContent>
            <Button
              aria-label="Delete pokemon from team"
              className="absolute top-4 right-4"
              title="Delete pokemon from team"
              variant="destructive"
              onClick={() => functions.removePokemonFromTeam(pokemon.id)}
            >
              <X />
            </Button>
          </PokemonCard>
        ))}
        {state.remainingPokemonSpots.map((_, index) => (
          <PokemonCard
            key={index}
            className="bg-muted/30 flex min-h-[260px] items-center justify-center"
          >
            {state.isGetTeamQueryLoading ? (
              <img alt="" className="size-24 animate-spin" src="/logo.svg" />
            ) : (
              <img
                alt=""
                className="max-h-24 max-w-24 grayscale"
                src="/logo.svg"
              />
            )}
          </PokemonCard>
        ))}
      </div>
    </div>
  )
}
