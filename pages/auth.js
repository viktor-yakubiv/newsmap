import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthPage = () => {
  const router = useRouter()
  const { token, next = '/' } = router.query

  useEffect(() => {
    if (token) {
      window.localStorage.ACCESS_TOKEN = token
      router.push(next)
    }
  }, [router, token, next])

  return (
    <form>
      <label htmlFor="token">Токен</label>
      <input
        id="token"
        name="token"
        defaultValue={token}
      />
      <button>Авторизуватися</button>
    </form>
  )
}

export default AuthPage
