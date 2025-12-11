import type { HTMLMotionProps } from "motion/react"
import type { ComponentProps } from "react"

import { cva } from "class-variance-authority"
import { motion } from "motion/react"

import type { PokemonType } from "@/../@types/pokeapi"

import { cn } from "@/utils/lib"

import { Skeleton } from "./Skeleton"

const PokemonCard = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "border-border overflow-hidden rounded-xl border p-5 shadow-xl",
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

const PokemonCardMotion = ({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) => (
  <motion.div
    className={cn(
      "border-border overflow-hidden rounded-xl border p-5 shadow-xl",
      className,
    )}
    {...props}
  >
    {children}
  </motion.div>
)

const PokemonCardImage = ({ className, ...props }: ComponentProps<"img">) => (
  <img
    className={cn(
      "pixelated-image mx-auto h-60 w-60 max-w-none object-contain",
      className,
    )}
    alt=""
    {...props}
  />
)

const PokemonCardImageNotFound = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "text-muted-foreground mx-auto flex h-60 w-60 items-center justify-center text-xl",
      className,
    )}
    {...props}
  >
    Image not found
  </div>
)

const PokemonCardSkeletonImage = () => (
  <Skeleton className="min-h-60 w-full min-w-60" />
)

const PokemonCardName = ({
  children,
  className,
  ...props
}: ComponentProps<"span">) => (
  <span className={cn("text-xl font-medium capitalize", className)} {...props}>
    {children}
  </span>
)

const PokemonCardSkeletonName = () => <Skeleton className="h-7 w-full" />

const PokemonCardNumber = ({
  className,
  children,
  ...props
}: ComponentProps<"span">) => (
  <span className={className} {...props}>
    {children}
  </span>
)

const PokemonCardSkeletonNumber = () => <Skeleton className="h-full w-9" />

const PokemonCardContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("flex max-h-max items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
)

const pokemonTypesVariants = cva<{ type: Record<string, string> }>(
  "rounded-xl regular-14 py-0.5 px-2 text-white font-medium",
  {
    defaultVariants: {
      type: "grass",
    },
    variants: {
      type: {
        bug: "bg-lime-600 dark:lime-500",
        dark: "bg-black",
        dragon: "bg-indigo-600 dark:indigo-500",
        electric: "bg-yellow-600 dark:yellow-500",
        fairy: "bg-pink-600 dark:pink-500",
        fighting: "bg-red-600 dark:red-500",
        fire: "bg-orange-600 dark:orange-500",
        flying: "bg-sky-600 dark:sky-500",
        ghost: "bg-purple-600 dark:purple-500",
        grass: "bg-green-600",
        ground: "bg-amber-600 dark:amber-500",
        normal: "bg-neutral-600 dark:neutral-500",
        poison: "bg-violet-600 dark:violet-500",
        rock: "bg-stone-600 dark:stone-500",
        steel: "bg-zinc-600 dark:zinc-500",
        water: "bg-blue-600 dark:blue-500",
        ice: "bg-cyan-400 dark:cyan-400",
        psychic: "bg-pink-400 dark:pink-400",
      },
    },
  },
)

interface PokemonCardTypesProps extends ComponentProps<"ul"> {
  types: PokemonType[]
}

const PokemonCardTypes = ({
  types,
  className,
  ...props
}: PokemonCardTypesProps) => (
  <ul className={cn("flex items-center gap-1", className)} {...props}>
    {types.map(({ type }) => (
      <li
        key={type.name}
        className={cn(pokemonTypesVariants({ type: type.name }))}
      >
        {type.name}
      </li>
    ))}
  </ul>
)

export {
  PokemonCard,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardImageNotFound,
  PokemonCardMotion,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
  PokemonCardTypes,
}
