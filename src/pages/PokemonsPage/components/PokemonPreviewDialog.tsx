import { X } from "lucide-react"
import { Link } from "react-router"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import {
  Dialog,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { usePokemonPreviewDialog } from "./hooks/usePokemonPreviewDialog"

interface PokemonDialogProps {
  pokemonId: Pokemon["id"]
  onClose: () => void
}

export const PokemonPreviewDialog = ({
  pokemonId,
  onClose,
}: PokemonDialogProps) => {
  const { state } = usePokemonPreviewDialog(pokemonId)

  return (
    <Dialog
      ref={state.dialogRef}
      className="flex flex-col rounded-xl border bg-white p-9"
      isOpen={!!pokemonId}
      closedby="any"
      onClose={onClose}
    >
      <div className="relative grid gap-4 text-black">
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
            <PokemonCardImage src={state.pokemon.img} />
            <PokemonCardTypes
              className="absolute top-0 left-0"
              types={state.pokemon.types}
            />
            <PokemonCardContent>
              <PokemonCardNumber>
                {formatPokemonId(state.pokemon.id)}
              </PokemonCardNumber>
              <PokemonCardName>{state.pokemon.name}</PokemonCardName>
            </PokemonCardContent>
          </>
        )}

        <Link
          className={cn(
            "mt-auto w-full rounded-xl border border-cyan-800 bg-cyan-500 p-3 text-center text-lg font-medium text-white transition-colors duration-250 hover:border-cyan-700 hover:bg-cyan-400",
            {
              "pointer-events-none opacity-10": state.isPokemonQueryLoading,
            },
          )}
          to={`/pokemon/${pokemonId}`}
        >
          More info
        </Link>
      </div>

      <button
        aria-label="Close"
        className="group absolute top-1 right-1 inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center p-1 transition-colors"
        title="Close"
        type="button"
        onClick={onClose}
      >
        <X className="text-zinc-600 group-hover:text-red-600" />
      </button>
    </Dialog>
  )
}
