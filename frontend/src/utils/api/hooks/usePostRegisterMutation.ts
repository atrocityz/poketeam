import { useMutation } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import type { PostRegisterUserRequestConfig } from "../requests"

import { postRegisterUser } from "../requests"

export const usePostRegisterMutation = (
  settings?: MutationSettings<
    PostRegisterUserRequestConfig,
    typeof postRegisterUser
  >,
) =>
  useMutation({
    mutationKey: [QUERY_KEYS.AUTH.POST_REGISTER_USER],
    mutationFn: ({ params, config }) =>
      postRegisterUser({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
