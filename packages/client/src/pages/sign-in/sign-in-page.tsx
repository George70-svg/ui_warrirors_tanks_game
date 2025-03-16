import { useUserSignIn } from '../../entities/user'
import { ROUTES } from '../../shared/config'
import { AuthForm, InputField } from '../../shared/ui'

interface Fields {
  login: string
  password: string
}

export function SignInPage() {
  const { fn, isLoading } = useUserSignIn()

  const handleSubmit = (values: Fields) => {
    fn({
      login: values.login,
      password: values.password,
    })
  }

  return (
    <AuthForm<Fields>
      title="Sign in"
      submitButtonText="Sign in"
      onSubmit={handleSubmit}
      footerLink={ROUTES.SIGN_UP}
      footerText="Don't have an account yet?"
      linkText="Sign up"
      disabled={isLoading}
    >
      <InputField name="login" />
      <InputField name="password" />
    </AuthForm>
  )
}
