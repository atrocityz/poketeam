import type { Generation } from "../Games/Generation"
import type { VersionGroup } from "../Games/VersionGroup"
import type { Effect, Name, VerboseEffect } from "../Utility/CommonModels"
import type { Language } from "../Utility/Language"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Pokemon } from "./Pokemon"

export interface Ability {
  effect_changes: AbilityEffectChange[]
  effect_entries: VerboseEffect[]
  flavor_text_entries: AbilityFlavorText[]
  generation: NamedApiResource<Generation>
  id: number
  is_main_series: boolean
  name: string
  names: Name[]
  pokemon: AbilityPokemon[]
}

export interface AbilityEffectChange {
  effect_entries: Effect[]
  version_group: NamedApiResource<VersionGroup>
}

export interface AbilityFlavorText {
  flavor_text: string
  language: NamedApiResource<Language>
  version_group: NamedApiResource<VersionGroup>
}

export interface AbilityPokemon {
  is_hidden: boolean
  pokemon: NamedApiResource<Pokemon>
  slot: number
}
