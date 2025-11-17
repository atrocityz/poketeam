export interface NamedApiResource {
  name: string
  url: string
}

export interface NamedApiResourceList<T> {
  count: number
  next: string
  previous: string
  results: T[]
}
