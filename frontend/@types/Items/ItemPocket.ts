import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { ItemCategory } from "./ItemCategory"

export interface ItemPocket {
  categories: NamedApiResource<ItemCategory>[]
  id: number
  name: string
}
