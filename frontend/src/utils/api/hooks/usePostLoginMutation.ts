import { useMutation } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import type { PostLoginUserRequestConfig } from "../requests/auth/login"

import { postLoginUser } from "../requests/auth/login"

export const usePostLoginMutation = (
  settings?: MutationSettings<PostLoginUserRequestConfig, typeof postLoginUser>,
) =>
  useMutation({
    mutationKey: [QUERY_KEYS.AUTH.POST_LOGIN_USER],
    mutationFn: ({ params, config }) =>
      postLoginUser({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
