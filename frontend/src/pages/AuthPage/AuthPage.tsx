import { FormContainer } from "./components/FormContainer"
import { Providers } from "./providers"

export const AuthPage = () => {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-4">
      <Providers stage={{ defaultStage: "login" }}>
        <FormContainer />
      </Providers>
    </div>
  )
}
