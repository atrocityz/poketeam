import type { Name } from "../Utility/CommonModels"

export interface EncounterMethod {
  id: number
  name: string
  names: Name[]
  order: number
}
