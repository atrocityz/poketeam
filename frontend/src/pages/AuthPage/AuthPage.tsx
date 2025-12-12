import { FormContainer } from "./components/FormContainer/FormContainer"
import { ThemeToggler } from "./components/ThemeToggler"

export const AuthPage = () => (
  <div className="mx-auto flex min-h-screen items-center justify-center px-4">
    <div className="fixed top-5 right-5">
      <ThemeToggler />
    </div>
    <FormContainer />
  </div>
)
