import React from "react"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { useRequestPokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

interface UsePokemonDialog {
  pokemonId: Pokemon["id"]
}

export const usePokemonDialog = ({ pokemonId }: UsePokemonDialog) => {
  const requestPokemonQuery = useRequestPokemonQuery({ id: pokemonId })
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  const pokemon =
    requestPokemonQuery.data &&
    dbPokemonToPokemonEntity(requestPokemonQuery.data.data)

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: requestPokemonQuery.isLoading,
      dialogRef,
    },
  }
}
