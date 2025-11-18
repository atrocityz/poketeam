import { X } from "lucide-react"
import { Link } from "react-router"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import {
  Dialog,
  PokemonCard,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
} from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"

import { usePokemonDialog } from "./hooks/usePokemonDialog"

interface PokemonDialogProps {
  pokemonId: Pokemon["id"]
  onClose: () => void
}

export const PokemonDialog = ({ pokemonId, onClose }: PokemonDialogProps) => {
  const { state } = usePokemonDialog({ pokemonId })

  return (
    <Dialog
      ref={state.dialogRef}
      isOpen={!!pokemonId}
      closedby="any"
      onClose={onClose}
    >
      <PokemonCard className="grid h-[460px] w-[320px] grid-rows-[240px_1fr] gap-5 bg-white p-9 text-black">
        {(state.isPokemonQueryLoading || !state.pokemon) && (
          <>
            <PokemonCardSkeletonImage />
            <PokemonCardContent>
              <PokemonCardSkeletonNumber />
              <PokemonCardSkeletonName />
            </PokemonCardContent>
          </>
        )}

        {state.pokemon && (
          <>
            <PokemonCardImage imgSrc={state.pokemon.img} />
            <PokemonCardContent>
              <PokemonCardNumber>
                {formatPokemonId(state.pokemon.id)}
              </PokemonCardNumber>
              <PokemonCardName>{state.pokemon.name}</PokemonCardName>
            </PokemonCardContent>
          </>
        )}

        <Link
          className="mt-auto w-full rounded-xl border-2 border-cyan-800 bg-cyan-500 p-3 text-center text-lg font-medium text-white transition-colors duration-250 hover:border-cyan-700 hover:bg-cyan-400"
          to={`/pokemon/${pokemonId}`}
        >
          More info
        </Link>

        <button
          aria-label="Close"
          className="group absolute top-1 right-1 inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center p-1 transition-colors"
          title="Close"
          type="button"
          onClick={onClose}
        >
          <X className="text-zinc-600 group-hover:text-red-600" />
        </button>
      </PokemonCard>
    </Dialog>
  )
}
