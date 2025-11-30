import { X } from "lucide-react"
import { Link } from "react-router"

import type { Pokemon } from "@/../@types/pokeapi"

import {
  Button,
  Dialog,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { routes } from "@/utils/config"
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
  const { state, refs } = usePokemonPreviewDialog(pokemonId)

  return (
    <Dialog
      ref={refs.dialogRef}
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
            {state.pokemon.img && <PokemonCardImage src={state.pokemon.img} />}
            {!state.pokemon.img && <PokemonCardImageNotFound />}
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

        <Button
          asChild
          className={cn(
            "rounded-xl border p-3 text-lg transition-colors duration-250",
            {
              "pointer-events-none opacity-25": state.isPokemonQueryLoading,
            },
          )}
        >
          <Link to={routes.pokemon.getHref(pokemonId)}>More info</Link>
        </Button>
      </div>

      <Button
        aria-label="Close"
        className="group absolute top-1 right-1 inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center p-1 transition-colors"
        title="Close"
        type="button"
        variant="ghost"
        onClick={onClose}
      >
        <X className="text-destructive" />
      </Button>
    </Dialog>
  )
}
