import type { ReactNode } from "react"

import type { Stage } from "../../contexts/stage"

import { useStage } from "../../contexts/stage"
import { LoginForm } from "../LoginForm"
import { RegisterForm } from "../RegisterForm"

const component: Record<Stage, ReactNode> = {
  login: <LoginForm />,
  register: <RegisterForm />,
}

export const FormContainer = () => {
  const { stage } = useStage()

  return component[stage]
}
