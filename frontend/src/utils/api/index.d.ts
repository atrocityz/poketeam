type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import("axios").AxiosRequestConfig }
  : { params: Params; config?: import("axios").AxiosRequestConfig }

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
