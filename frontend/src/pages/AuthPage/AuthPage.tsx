import { FormContainer } from "./components/FormContainer"
import { AuthPageProviders } from "./providers"

export const AuthPage = () => (
  <div className="mx-auto flex min-h-screen items-center justify-center px-4">
    <AuthPageProviders stage={{ defaultStage: "login" }}>
      <FormContainer />
    </AuthPageProviders>
  </div>
)
