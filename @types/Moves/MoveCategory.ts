import type { Description } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { Move } from "./Move"

export interface MoveCategory {
  descriptions: Description[]
  id: number
  moves: NamedApiResource<Move>[]
  name: string
}
