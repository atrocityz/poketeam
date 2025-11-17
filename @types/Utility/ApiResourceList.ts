import type { Endpoint } from "../../lib/Endpoint"

export interface Base {
  id: number
}

export type NamedBase = Base & { name: string }

export interface ApiResource<T extends Base> {
  endpoint?: Endpoint<T>
  url: string
}

export interface ApiResourceList<T extends Base> {
  count: number
  next: string
  previous: string
  results: T[]
}
