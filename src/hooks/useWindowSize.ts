/* eslint-disable react-hooks/rules-of-hooks */
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    const debouncedResize = useDebounce(handleResize, 500)

    debouncedResize()

    window.addEventListener('resize', debouncedResize)

    return () => window.removeEventListener('resize', debouncedResize)
  }, [])

  return windowWidth
}

export default useWindowWidth
