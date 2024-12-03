import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../utils/localStorage/localStorageService'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const token = useLocalStorage.getLocalStorageData('token')
  const navigate = useNavigate()

  const value: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated
  }

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    } else {
      navigate('/login')
    }
  }, [token, navigate])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }
