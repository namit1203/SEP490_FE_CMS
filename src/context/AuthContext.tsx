import { ReactNode, createContext, useContext, useLayoutEffect, useState } from 'react'
import { useCookieServices } from '../utils/cookies/cookieServices'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const token = useCookieServices.getCookie('token')

  const value: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated
  }

  useLayoutEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])

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
