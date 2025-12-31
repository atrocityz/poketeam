import { useMutation } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import type { GetLogoutRequestConfig } from "../requests"

import { logout } from "../requests"

export const usePostLogoutMutation = (
  settings?: MutationSettings<GetLogoutRequestConfig, typeof logout>,
) =>
  useMutation({
    mutationKey: [QUERY_KEYS.AUTH.LOGOUT],
    mutationFn: ({ config }) =>
      logout({ config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
