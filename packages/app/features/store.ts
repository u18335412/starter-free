import { create } from 'zustand'

type TTodo = {
  id: string
  text: string
  completed: boolean
}
interface BearState {
  todos: TTodo[]
  sortBy: 'asc' | 'desc'
  addTodo: (todo: TTodo) => void
  removeTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  toggleTodo: (id: string) => void
  toggleSortBy: () => void
}

const useTodoStore = create<BearState>()((set) => ({
  todos: [],
  sortBy: 'asc',
  toggleSortBy: () =>
    set((state) => ({
      sortBy: state.sortBy === 'asc' ? 'desc' : 'asc',
    })),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  editTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}))

export { TTodo, useTodoStore }
