import { create } from 'zustand'
import { Baby } from '@prisma/client'

export type State = {
  babies: Baby[] | []
  selectedBaby: Baby | null
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
  }) => Promise<void>
  setSelectedBaby: (selectedBaby: Baby) => void
  removeBaby: (babyId: string) => Promise<void>
  updateBaby: (babyId: string, updatedBaby: Baby) => Promise<void>
}

const useBabyStore = create<State>((set) => ({
  babies: [],
  selectedBaby: null,
  actions: {
    setBabies: (state) =>
      set({
        babies: state,
      }),
    setSelectedBaby: (selectedBaby) =>
      set({
        selectedBaby: selectedBaby,
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
    updateBaby: async (babyId, updatedBaby) => {
      try {
        await fetch(`/api/babies/${babyId}`, {
          method: 'PUT',
          body: JSON.stringify(updatedBaby),
        })

        set((state) => ({
          babies: state.babies
            ? state.babies.map((baby) => (baby.id === babyId ? { ...baby, ...updatedBaby } : baby))
            : [],
        }))
      } catch (e) {
        throw new Error('Failed to remove baby')
      }
    },
  },
}))

export const useBabies = () => useBabyStore((state) => state.babies)

export const useSelectedBaby = () => useBabyStore((state) => state.selectedBaby)

export const useBabiesActions = () => useBabyStore((state) => state.actions)

// TA CHEIO DE COMENTÁRIO ESCONDIDO POR AI
// ─────▀▄▀─────▄─────▄
// ──▄███████▄──▀██▄██▀
// ▄█████▀█████▄──▄█
// ███████▀████████▀
// ─▄▄▄▄▄▄███████▀
// NÃO VALE OLHAR HISTÓRICO DE ALTERAÇÃO NO GITHUB, SE OLHAR TU PERDEU
