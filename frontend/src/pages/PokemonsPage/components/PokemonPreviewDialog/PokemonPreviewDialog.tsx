import { X } from "lucide-react"
import React from "react"
import { Link } from "react-router"

import type { Pokemon } from "@/../@types/pokeapi"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  PokemonCardBackgroundImage,
  PokemonCardContent,
  PokemonCardHeader,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonBackground,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
} from "@/components/ui"
import { routes } from "@/utils/config"
import { formatPokemonId } from "@/utils/helpers"
import { cn } from "@/utils/lib"

import { usePokemonPreviewDialog } from "./hooks/usePokemonPreviewDialog"

interface PokemonDialogProps {
  isOpen: boolean
  pokemonId: Pokemon["id"]
  onClose: () => void
}

export const PokemonPreviewDialog = ({
  pokemonId,
  onClose,
  isOpen,
}: PokemonDialogProps) => {
  const { state } = usePokemonPreviewDialog(pokemonId, onClose)

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent
        className="w-[320px] overflow-hidden p-0"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <Button
            aria-label="Close"
            className="group absolute top-1 right-1 z-10 inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center p-1 transition-colors"
            title="Close"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <X className="text-destructive" />
          </Button>
        </DialogClose>
        <DialogTitle className="sr-only">Pokemon card</DialogTitle>
        <DialogDescription className="sr-only">
          Preview pokemon card, you can follow the link for detailed statistics
        </DialogDescription>
        <div className="relative">
          {(!state.pokemon || state.isPokemonQueryLoading) && (
            <React.Fragment>
              <PokemonCardSkeletonBackground />
              <PokemonCardContent>
                <PokemonCardHeader>
                  <PokemonCardSkeletonNumber />
                  <PokemonCardSkeletonName />
                </PokemonCardHeader>
              </PokemonCardContent>
            </React.Fragment>
          )}

          {state.pokemon && (
            <React.Fragment>
              <PokemonCardBackgroundImage className="relative">
                {state.pokemon.img ? (
                  <PokemonCardImage src={state.pokemon.img} />
                ) : (
                  <PokemonCardImageNotFound />
                )}
                <PokemonCardTypes
                  className="absolute top-0 left-0"
                  types={state.pokemon.types}
                />
              </PokemonCardBackgroundImage>
              <PokemonCardContent>
                <PokemonCardHeader className="border-none not-last:pb-0">
                  <PokemonCardNumber>
                    {formatPokemonId(state.pokemon.id)}
                  </PokemonCardNumber>
                  <PokemonCardName>{state.pokemon.name}</PokemonCardName>
                </PokemonCardHeader>
              </PokemonCardContent>
            </React.Fragment>
          )}
          <Button
            asChild
            className={cn(
              "mx-4 mb-4 flex rounded-xl border p-3 transition-colors duration-250",
              {
                "pointer-events-none opacity-25":
                  state.isPokemonQueryLoading || !state.pokemon,
              },
            )}
          >
            <Link className="uppercase" to={routes.pokemon.getHref(pokemonId)}>
              More
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
