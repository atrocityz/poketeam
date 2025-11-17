import React from "react"
import { Link } from "react-router"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { usePokemonQuery } from "@/utils/api/hooks"

interface PokemonPopupProps {
  pokemonId: Pokemon["id"]
  onClose: () => void
}

export const PokemonPopup = ({ pokemonId, onClose }: PokemonPopupProps) => {
  const { data } = usePokemonQuery({ id: pokemonId })

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="fixed top-1/2 left-1/2 min-h-52 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300">
      <button
        className="absolute top-3 right-3"
        type="button"
        onClick={onClose}
      >
        X
      </button>
      Pokemon Popup {pokemonId}
      {data?.name}
      <Link to={`/pokemon/${pokemonId}`}>More info</Link>
    </div>
  )
}
