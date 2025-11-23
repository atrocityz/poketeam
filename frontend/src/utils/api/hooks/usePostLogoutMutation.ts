import { useMutation } from "@tanstack/react-query"

import type { GetLogoutRequestConfig } from "../requests"

import { logout } from "../requests"

export const usePostLogoutMutation = (
  settings?: MutationSettings<GetLogoutRequestConfig, typeof logout>,
) =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: ({ config }) =>
      logout({ config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
