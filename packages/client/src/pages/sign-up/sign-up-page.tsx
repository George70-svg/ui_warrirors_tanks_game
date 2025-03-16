import {
  AuthForm,
  EmailField,
  FirstNameField,
  SecondNameField,
  LoginField,
  PasswordField,
  PhoneField,
} from '../../shared/ui'
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
      linText="Sign in"
    >
      <FirstNameField />
      <SecondNameField />
      <LoginField />
      <EmailField />
      <PasswordField />
      <PhoneField />
    </AuthForm>
  )
}
