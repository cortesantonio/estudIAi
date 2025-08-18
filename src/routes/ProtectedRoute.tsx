import { useEffect, useState, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateToken } from '../services/authService'

type ProtectedRouteProps = {
  children: ReactElement
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [checking, setChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const isValid = await validateToken()
      if (!isValid) {
        localStorage.clear()
        navigate('/auth/login', { replace: true })
        return
      }
      setChecking(false)
    })()
  }, [navigate])

  if (checking) return null
  return children
}


