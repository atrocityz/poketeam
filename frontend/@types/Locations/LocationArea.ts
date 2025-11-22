import type { EncounterMethod } from "../Encounters/EncounterMethod"
import type { Version } from "../Games/Version"
import type { Pokemon } from "../Pokemon/Pokemon"
import type { Name, VersionEncounterDetail } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Location } from "./Location"

export interface LocationArea {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: NamedApiResource<Location>
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: NamedApiResource<EncounterMethod>
  version_details: EncounterVersionDetails[]
}

export interface EncounterVersionDetails {
  rate: number
  version_details: NamedApiResource<Version>
}

export interface PokemonEncounter {
  pokemon: NamedApiResource<Pokemon>
  version_details: VersionEncounterDetail[]
}
