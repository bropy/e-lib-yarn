'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// interface
interface Comment {
  id: string
  bookKey: string
  text: string
  timestamp: number
}
export type { Comment }
interface BookStore {
  likedBooks: string[]
  comments: Comment[]
  toggleLike: (bookKey: string) => void
  isLiked: (bookKey: string) => boolean
  addComment: (bookKey: string, text: string) => void
  removeComment: (commentId: string) => void
  getCommentsForBook: (bookKey: string) => Comment[]
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      likedBooks: [] as string[],
      comments: [] as Comment[],
      
      toggleLike: (bookKey: string) => {
        set((state) => ({
          likedBooks: state.likedBooks.includes(bookKey)
            ? state.likedBooks.filter(key => key !== bookKey)
            : [...state.likedBooks, bookKey]
        }))
      },
      
      isLiked: (bookKey: string) => {
        return get().likedBooks.includes(bookKey)
      },
      
      addComment: (bookKey: string, text: string) => {
        const newComment: Comment = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          bookKey,
          text,
          timestamp: Date.now()
        }
        
        set((state) => ({
          comments: [...state.comments, newComment]
        }))
      },
      
      removeComment: (commentId: string) => {
        set((state) => ({
          comments: state.comments.filter(comment => comment.id !== commentId)
        }))
      },
      
      getCommentsForBook: (bookKey: string) => {
        return get().comments.filter(comment => comment.bookKey === bookKey)
      }
    }),
    {
      name: 'book-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
