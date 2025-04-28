import {
  selectIsUserDataUpdating,
  signIn,
  oauthYaServiceId,
  selectUserOauthYaClintId,
} from '../../entities/user'
import { ROUTES } from '../../shared/config'
import { AuthForm, InputField } from '../../shared/ui'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import { useEffect } from 'react'
import { OAUTH_YA_REDIRECT_URI } from '../../shared/config/constants'
interface Fields {
  login: string
  password: string
}

export function SignInPage() {
  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)
  const userOauthYaClintId = useAppSelector(selectUserOauthYaClintId)

  const handleSubmit = (values: Fields) => {
    dispatch(signIn(values))
  }

  const handleOauthYa = () => {
    dispatch(oauthYaServiceId())
  }

  useEffect(() => {
    if (userOauthYaClintId) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${userOauthYaClintId}&redirect_uri=${OAUTH_YA_REDIRECT_URI}`
    }
  }, [userOauthYaClintId])

  return (
    <AuthForm<Fields>
      title="Sign in"
      submitButtonText="Sign in"
      onSubmit={handleSubmit}
      onYaAuth={handleOauthYa}
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
