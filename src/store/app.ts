/* eslint-disable no-unused-vars */
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface AppPersistState {
  imageFile: File
  setImageFile: (imageFile: File) => void
}

export const useAppPersistStore = create(
  persist<AppPersistState>(
    (set) => ({
      imageFile: new File([], ''),
      setImageFile: (imageFile: File) => set(() => ({ imageFile })),
    }),
    { name: 'nimrodelweb3event.store' }
  )
)
