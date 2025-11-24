import { FormContainer } from "./components/FormContainer"
import { AuthPageProviders } from "./providers"

// TODO: Обработать поведение при случае, когда пользователь уже авторизован
export const AuthPage = () => {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-4">
      <AuthPageProviders stage={{ defaultStage: "login" }}>
        <FormContainer />
      </AuthPageProviders>
    </div>
  )
}
