import {
  PokemonCard,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
} from "@/components/ui"
import { POKEMONS_QUERY } from "@/utils/constants"

export const PokemonListSkeleton = () =>
  Array.from({ length: POKEMONS_QUERY.LIMIT }).map((_, index) => (
    <PokemonCard key={index} className="flex justify-between gap-4">
      <PokemonCardSkeletonName />
      <PokemonCardSkeletonNumber />
    </PokemonCard>
  ))
