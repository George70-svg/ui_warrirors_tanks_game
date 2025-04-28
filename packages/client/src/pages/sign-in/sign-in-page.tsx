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
interface Fields {
  login: string
  password: string
}

export function SignInPage() {
  const serverHost = 'localhost'
  const serverPort = '3000'
  const redirect_uri = `http://${serverHost}:${serverPort}`

  const dispatch = useAppDispatch()
  const isUserDataUpdating = useAppSelector(selectIsUserDataUpdating)
  const userOauthYaClintId = useAppSelector(selectUserOauthYaClintId)

  const handleSubmit = (values: Fields) => {
    dispatch(signIn(values))
  }

  const handleOauthYa = () => {
    const oauthYaClientParams = {
      redirect_uri,
    }
    dispatch(oauthYaServiceId(oauthYaClientParams))
  }

  useEffect(() => {
    if (redirect_uri && userOauthYaClintId) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${userOauthYaClintId}&redirect_uri=${redirect_uri}`
    }
  }, [redirect_uri, userOauthYaClintId])

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
