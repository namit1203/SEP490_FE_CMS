import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GlobalState {
  isExpanded: boolean
  toggleExpanded: (isExpanded: boolean) => void
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isExpanded: false,
      toggleExpanded: (isExpanded: boolean) => set({ isExpanded })
    }),
    { name: 'GlobalStore' }
  )
)
