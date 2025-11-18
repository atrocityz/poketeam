import React from "react"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { usePokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

interface UsePokemonDialog {
  pokemonId: Pokemon["id"]
}

export const usePokemonDialog = ({ pokemonId }: UsePokemonDialog) => {
  const { data: pokemonQueryData, isLoading: isPokemonQueryLoading } =
    usePokemonQuery({ id: pokemonId })
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  const pokemon =
    pokemonQueryData && dbPokemonToPokemonEntity(pokemonQueryData.data)

  return {
    state: {
      pokemon,
      isPokemonQueryLoading,
      dialogRef,
    },
  }
}
