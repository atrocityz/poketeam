import { useMutation } from "@tanstack/react-query"

import type { PostLoginUserRequestConfig } from "../requests/auth/login"

import { postLoginUser } from "../requests/auth/login"

export const usePostLoginMutation = (
  settings?: MutationSettings<PostLoginUserRequestConfig, typeof postLoginUser>,
) =>
  useMutation({
    mutationKey: ["postLoginUser"],
    mutationFn: ({ params, config }) =>
      postLoginUser({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
