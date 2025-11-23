import type { Description, Name } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Move } from "./Move"

export interface MoveTarget {
  descriptions: Description[]
  id: number
  moves: NamedApiResource<Move>[]
  name: string
  names: Name[]
}
