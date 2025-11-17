import { useParams } from "react-router"

import { usePokemonQuery } from "@/utils/api/hooks"

export const usePokemonPage = () => {
  const params = useParams()
  const { data, isLoading } = usePokemonQuery({
    id: +(params.pokemonId as string),
  })

  const pokemon = data && {
    name: data.name,
    id: data.id,
    img: data.sprites.versions["generation-v"]["black-white"].animated
      .front_default,
    types: data.types,
  }

  return {
    state: {
      pokemon,
      isLoading,
    },
  }
}
