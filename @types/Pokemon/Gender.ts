import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { PokemonSpecies } from "./PokemonSpecies"

export interface Gender {
  id: number
  name: string
  pokemon_species_details: PokemonSpeciesGender[]
  required_for_evolution: NamedApiResource<PokemonSpecies>[]
}

export interface PokemonSpeciesGender {
  pokemon_species: NamedApiResource<PokemonSpecies>
  rate: number
}
