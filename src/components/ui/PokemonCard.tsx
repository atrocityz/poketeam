import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/utils/lib/cn"

import { Skeleton } from "./Skeleton"

interface PokemonCardProps extends ComponentProps<"div"> {
  children: ReactNode
}

const PokemonCard = ({ children, className, ...props }: PokemonCardProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border border-gray-400 p-5 shadow-xl",
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

interface PokemonCardImageProps {
  className?: string
  imgSrc: string
}

const PokemonCardImage = ({ imgSrc, className }: PokemonCardImageProps) => (
  <img
    className={cn(
      "pixelated-image min-h-60 self-center justify-self-center",
      className,
    )}
    alt=""
    src={imgSrc}
  />
)

const PokemonCardSkeletonImage = () => (
  <Skeleton className="min-h-[220px] min-w-full self-center justify-self-center" />
)

interface PokemonCardNameProps {
  children: ReactNode
  className?: string
}

const PokemonCardName = ({ children, className }: PokemonCardNameProps) => (
  <span className={cn("text-xl font-medium capitalize", className)}>
    {children}
  </span>
)

const PokemonCardSkeletonName = () => <Skeleton className="h-4 w-full" />

export {
  PokemonCard,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
}
