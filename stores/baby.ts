import { create } from 'zustand'
import { Baby } from '@prisma/client'

export type State = {
  babies: Baby[] | []
  actions: Actions
}

export type Actions = {
  setBabies(state: Baby[] | []): void
  addBaby: (values: {
    name: string
    height: string
    weight: string
    birthDate: string
    gender: 'OTHER' | 'MALE' | 'FEMALE'
    brand?: string | undefined
    notes?: string | undefined
  }) => void
  removeBaby: (babyId: string) => void
  updateBaby: (updatedBaby: Baby, babyId: string) => Promise<void>
}

const useBabyStore = create<State>((set) => ({
  babies: [],
  actions: {
    setBabies: (state) =>
      set({
        babies: state,
      }),
    addBaby: async (values) => {
      try {
        const response = await fetch('/api/babies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const newBaby = await response.json()

        set((state) => ({
          babies: state.babies ? [...state.babies, newBaby] : [newBaby],
        }))
      } catch (e) {
        throw new Error('Failed to add baby')
      }
    },
    removeBaby: async (babyId) => {
      // Remove the answer from the state
      try {
        await fetch(`/api/babies/${babyId}`, {
          method: 'DELETE',
        })

        set((state) => ({
          babies: state.babies ? state.babies.filter((baby) => baby.id !== babyId) : [],
        }))
      } catch (e) {
        throw new Error('Failed to remove baby')
      }
    },
    updateBaby: async (updatedBaby, babyId) => {
      try {
        const newBabyValue = await fetch(`/api/babies/${babyId}`, {
          method: 'PUT',
        })

        set((state) => ({
          babies: state.babies
            ? state.babies.map((baby) => (baby.id === babyId ? { ...baby, ...newBabyValue } : baby))
            : [],
        }))
      } catch (e) {
        throw new Error('Failed to remove baby')
      }
    },
  },
}))

export const useBabies = () => useBabyStore((state) => state.babies)

export const useBabiesActions = () => useBabyStore((state) => state.actions)
