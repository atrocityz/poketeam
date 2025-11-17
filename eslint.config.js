import { eslint } from "@siberiacancode/eslint"

export default eslint({
  typescript: true,
  react: true,
  jsx: true,
  jsxA11y: true,
  rules: {
    "react/no-comment-textnodes": "off",
    "react-hooks-extra/no-unnecessary-use-prefix": "off",
    "react-hooks-extra/prefer-use-state-lazy-initialization": "off",

    "react/no-unnecessary-use-prefix": "error",
    "react/prefer-use-state-lazy-initialization": "error",
  },
})
