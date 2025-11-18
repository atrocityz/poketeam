import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/utils/lib"

import { Skeleton } from "./Skeleton"

interface PokemonCardProps extends ComponentProps<"div"> {
  children: ReactNode
}

const PokemonCard = ({ children, className, ...props }: PokemonCardProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border-2 border-gray-200 p-5 shadow-xl",
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
  <Skeleton className="min-h-60 min-w-full self-center justify-self-center" />
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

const PokemonCardSkeletonName = () => <Skeleton className="h-7 w-25" />

interface PokemonCardNumberProps extends ComponentProps<"span"> {
  children: ReactNode
}

const PokemonCardNumber = ({
  className,
  children,
  ...props
}: PokemonCardNumberProps) => (
  <span className={className} {...props}>
    {children}
  </span>
)

const PokemonCardSkeletonNumber = () => <Skeleton className="h-6 w-9" />

interface PokemonCardContentProps extends ComponentProps<"div"> {
  children: ReactNode
}

const PokemonCardContent = ({
  children,
  className,
  ...props
}: PokemonCardContentProps) => (
  <div
    className={cn("flex max-h-max items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
)

export {
  PokemonCard,
  PokemonCardContent,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardNumber,
  PokemonCardSkeletonImage,
  PokemonCardSkeletonName,
  PokemonCardSkeletonNumber,
}
