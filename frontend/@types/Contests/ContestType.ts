import type { BerryFlavor } from "../Berries/BerryFlavor"
import type { Language } from "../Utility/Language"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"

export interface ContestType {
  berry_flavor: NamedApiResource<BerryFlavor>
  id: number
  name: string
  names: ContestName[]
}

export interface ContestName {
  color: string
  language: NamedApiResource<Language>
  name: string
}
