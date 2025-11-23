export interface NamedApiResource<T = unknown> {
  name: string
  url: string
}

export interface NamedApiResourceList<T> {
  count: number
  next: string
  previous: string
  results: T[]
}
