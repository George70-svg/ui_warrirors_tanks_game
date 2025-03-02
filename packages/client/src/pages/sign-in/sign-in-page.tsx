import { useId } from 'react'
import { useUserSignIn } from '../../entities/user'

export function SignInPage() {
  const { fn, error, isLoading } = useUserSignIn()
  const loginId = useId()
  const passwordId = useId()
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        fn({
          login: String(data.get('login')),
          password: String(data.get('password')),
        })
      }}
    >
      {error && <div>{error.message}</div>}
      {error?.data && <div>{JSON.stringify(error.data)}</div>}
      <label htmlFor={loginId}>Login</label>
      <input type="text" id={loginId} name="login" />
      <label htmlFor={passwordId}>Password</label>
      <input type="password" id={passwordId} name="password" />
      <button type="submit" disabled={isLoading}>
        Sign in
      </button>
    </form>
  )
}
