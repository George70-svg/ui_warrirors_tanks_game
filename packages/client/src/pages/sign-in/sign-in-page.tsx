import { selectIsUserDataUpdating, signIn } from '../../entities/user'
import { ROUTES } from '../../shared/config'
import { AuthForm, InputField } from '../../shared/ui'
import { useAppDispatch, useAppSelector } from '../../shared/lib'

interface Fields {
  login: string
  password: string
}

export function SignInPage() {
  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)

  const handleSubmit = (values: Fields) => {
    dispatch(signIn(values))
  }

  return (
    <AuthForm<Fields>
      title="Sign in"
      submitButtonText="Sign in"
      onSubmit={handleSubmit}
      footerLink={ROUTES.SIGN_UP}
      footerText="Don't have an account yet?"
      linkText="Sign up"
      disabled={isUserDataUpdating}
    >
      <InputField name="login" />
      <InputField name="password" />
    </AuthForm>
  )
}
