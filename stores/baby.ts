import { create } from 'zustand'
import { Baby } from '@prisma/client'

export type State = {
  babies: Baby[] | []
  actions: Actions
}

export type Actions = {
  setBabies(state: Baby[] | []): void
  addBaby: (newBaby: Baby) => void
  removeBaby: (babyId: string) => void
  //   updateAnswer: (content: MessageContent, messageId: string) => Promise<void>
}

const useBabyStore = create<State>((set) => ({
  babies: [],
  actions: {
    setBabies: (state) =>
      set({
        babies: state,
      }),
    addBaby: (newBaby) => {
      set((state) => ({
        babies: state.babies ? [...state.babies, newBaby] : [newBaby],
      }))
    },
    removeBaby: async (babyId) => {
      // Remove the answer from the state
      set((state) => ({
        babies: state.babies ? state.babies.filter((baby) => baby.id !== babyId) : [],
      }))

      // Then perform the side-effect of removing the answer from the database
      //   try {
      //     await deleteMessage(answerId)
      //   } catch (error) {
      //     console.error('Failed to remove answer:', error)
      //   }
    },
    // updateAnswer: async (content, messageId) => {
    //   // Then perform the side-effect of updating the database
    //   try {
    //     await updateMessage(content, messageId)
    //   } catch (error) {
    //     throw new Error('Failed to update answer')
    //   }

    //   // Update the state first
    //   set((state) => ({
    //     answers: state.answers
    //       ? state.answers.map((answer) =>
    //           answer.id === messageId ? { ...answer, content: JSON.stringify(content) } : answer
    //         )
    //       : [],
    //   }))
    // },
  },
}))

export const useBabies = () => useBabyStore((state) => state.babies)

export const useBabiesActions = () => useBabyStore((state) => state.actions)
