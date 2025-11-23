import type { BerryFlavor } from "../Berries/BerryFlavor"
import type { MoveBattleStyle } from "../Moves/MoveBattleStyle"
import type { Name } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { PokeathlonStat } from "./PokeathlonStat"
import type { Stat } from "./Stat"

export interface Nature {
  decreased_stat: NamedApiResource<Stat>
  hates_flavor: NamedApiResource<BerryFlavor>
  id: number
  increased_stat: NamedApiResource<Stat>
  likes_flavor: NamedApiResource<BerryFlavor>
  move_battle_style_preference: MoveBattleStylePreference[]
  name: string
  names: Name[]
  pokeathlon_stat_changes: NatureStatChange[]
}

export interface NatureStatChange {
  max_change: number
  pokeathlon_stat: NamedApiResource<PokeathlonStat>
}

export interface MoveBattleStylePreference {
  high_hp_preference: number
  low_hp_preference: number
  move_battle_style: NamedApiResource<MoveBattleStyle>
}
