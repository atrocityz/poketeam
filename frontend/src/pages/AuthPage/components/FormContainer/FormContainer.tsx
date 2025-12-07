import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui"

import type { Stage } from "../../stores"

import { useStageStore } from "../../stores"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"

const component: Record<Stage, ReactNode> = {
  login: <LoginForm />,
  register: <RegisterForm />,
}

export const FormContainer = () => {
  const stage = useStageStore((state) => state.stage)

  return (
    <Card className="min-w-[350px]">
      <CardContent>{component[stage]}</CardContent>
    </Card>
  )
}
