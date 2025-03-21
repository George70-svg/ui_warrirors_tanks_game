import { AuthForm, InputField } from '../../shared/ui'
import { ROUTES } from '../../shared/config'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import { selectIsUserDataUpdating, signUp } from '../../entities/user'

interface Fields {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export function SignUpPage() {
  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)

  const handleSubmit = (values: Fields) => {
    dispatch(signUp(values))
  }

  return (
    <AuthForm<Fields>
      disabled={isUserDataUpdating}
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
