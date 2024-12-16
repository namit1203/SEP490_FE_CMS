import { useLocalStorage } from './localStorage/localStorageService'

// Utility function to check roles
export const hasRole = (userRoles: string[], requiredRoles: string | string[]): boolean => {
  const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
  return rolesToCheck.some((role) => userRoles.includes(role))
}

// Utility to get roles from local storage
export const getUserRoles = (): string[] => {
  const roles = useLocalStorage.getLocalStorageData('role')
  return roles ? roles : []
}
