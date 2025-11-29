import type { ReactNode } from "react"

import type { Stage } from "../../stores"

import { useStageStore } from "../../stores"
import { LoginForm } from "../LoginForm"
import { RegisterForm } from "../RegisterForm"

const component: Record<Stage, ReactNode> = {
  login: <LoginForm />,
  register: <RegisterForm />,
}

export const FormContainer = () => {
  const state = useStageStore((state) => state.stage)

  return component[state]
}
