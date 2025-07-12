import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    
    // Redirigir al login
    navigate('/auth/login')
  }

  return { logout }
} 