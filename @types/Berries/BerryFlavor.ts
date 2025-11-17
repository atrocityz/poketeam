import type { ContestType } from "../Contests/ContestType"
import type { Name } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Berry } from "./Berry"

export interface BerryFlavor {
  berries: FlavorBerryMap[]
  contest_type: NamedApiResource<ContestType>
  id: number
  name: string
  names: Name[]
}

export interface FlavorBerryMap {
  berry: NamedApiResource<Berry>
  potency: number
}
