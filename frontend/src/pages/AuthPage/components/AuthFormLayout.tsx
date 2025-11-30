import type { BaseSyntheticEvent, ReactNode } from "react"

interface AuthFormLayoutProps {
  children: ReactNode
  description: string
  isLoading: boolean
  link: ReactNode
  title: string
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
}

export const AuthFormLayout = ({
  children,
  description,
  onSubmit,
  isLoading,
  title,
  link,
}: AuthFormLayoutProps) => (
  <form className="flex flex-col gap-2" onSubmit={onSubmit}>
    <div className="mb-4 grid gap-1 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>

    <fieldset className="flex flex-col gap-4" disabled={isLoading}>
      {children}
    </fieldset>

    {link}
  </form>
)
