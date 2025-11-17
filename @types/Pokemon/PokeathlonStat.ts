import type { Name } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Nature } from "./Nature"

export interface PokeathlonStat {
  affecting_natures: NaturePokeathlonStatAffectSets
  id: number
  name: string
  names: Name[]
}

export interface NaturePokeathlonStatAffectSets {
  decrease: NaturePokeathlonStatAffect[]
  increase: NaturePokeathlonStatAffect[]
}

export interface NaturePokeathlonStatAffect {
  max_change: number
  nature: NamedApiResource<Nature>
}
