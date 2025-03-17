import { AuthForm, InputField } from '../../shared/ui'
import { ROUTES } from '../../shared/config'
import { useUserSignUp } from '../../entities/user'

interface Fields {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export function SignUpPage() {
  const { fn, isLoading } = useUserSignUp()

  const handleSubmit = (values: Fields) => {
    fn({ ...values })
  }

  return (
    <AuthForm<Fields>
      disabled={isLoading}
      title="Sign up"
      submitButtonText="Sign up"
      onSubmit={handleSubmit}
      footerLink={ROUTES.SIGN_IN}
      footerText="Already have account?"
      linkText="Sign in"
    >
      <InputField name="first_name" />
      <InputField name="second_name" />
      <InputField name="login" />
      <InputField name="email" />
      <InputField name="password" />
      <InputField name="phone" />
    </AuthForm>
  )
}
