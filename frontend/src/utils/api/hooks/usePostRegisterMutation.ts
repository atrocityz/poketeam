import { useMutation } from "@tanstack/react-query"

import type { PostRegisterUserRequestConfig } from "../requests"

import { postRegisterUser } from "../requests"

export const usePostRegisterMutation = (
  settings?: MutationSettings<
    PostRegisterUserRequestConfig,
    typeof postRegisterUser
  >,
) =>
  useMutation({
    mutationKey: ["postRegisterUser"],
    mutationFn: ({ params, config }) =>
      postRegisterUser({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
