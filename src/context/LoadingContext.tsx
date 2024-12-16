import React, { createContext, useContext, useState } from 'react'

interface LoadingContextType {
  isLoadingGlobal: boolean
  setLoading: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoadingGlobal, setLoading] = useState(false)

  return <LoadingContext.Provider value={{ isLoadingGlobal, setLoading }}>{children}</LoadingContext.Provider>
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
