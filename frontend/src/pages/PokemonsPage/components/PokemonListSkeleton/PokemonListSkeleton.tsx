import {
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
} from "@/components/ui"
import { POKEMONS } from "@/utils/constants"

export const PokemonListSkeleton = () =>
  Array.from({ length: POKEMONS.LIMIT }).map((_, index) => (
    <div
      key={index}
      className="border-accent-foreground/15 flex items-center justify-between gap-2 overflow-hidden rounded-lg border px-4 py-3"
    >
      <PokemonCardSkeletonName />
      <PokemonCardSkeletonNumber />
    </div>
  ))
