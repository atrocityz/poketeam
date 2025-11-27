interface QuerySettings<Func = unknown> {
  config?: import("axios").AxiosRequestConfig
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    "queryKey"
  >
}

interface InfinityQuerySettings<Func = unknown> {
  config?: import("axios").AxiosRequestConfig
  options?: Omit<
    import("@tanstack/react-query").UseInfiniteQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      import("@tanstack/react-query").InfiniteData<Awaited<ReturnType<Func>>>,
      any
    >,
    "getNextPageParam" | "initialPageParam" | "queryKey"
  >
}

interface MutationSettings<Params = void, Func = unknown> {
  config?: import("axios").AxiosRequestConfig
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >
}
