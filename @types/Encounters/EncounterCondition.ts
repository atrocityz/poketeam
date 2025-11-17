import type { Name } from "../Utility/CommonModels"
import type { NamedApiResource } from "../Utility/NamedApiResourceList"
import type { EncounterConditionValue } from "./EncounterConditionValue"

export interface EncounterCondition {
  id: number
  name: string
  names: Name[]
  values: NamedApiResource<EncounterConditionValue>[]
}
