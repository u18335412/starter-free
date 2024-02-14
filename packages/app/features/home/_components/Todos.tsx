import { YGroup, ListItem } from '@my/ui'
import { FC, useMemo } from 'react'
import Animated, { FadeOut } from 'react-native-reanimated'
import { TTodo, useTodoStore } from '../../store'
import { TodoItem } from './TodoItem'
import { NoTodos } from './NoTodos'

const useSortedList = (unsortedTodos: TTodo[], sortBy: 'asc' | 'desc') => {
  return useMemo(() => {
    return unsortedTodos.slice().sort((a, b) => {
      if (sortBy === 'asc') {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1
      }
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1
    })
  }, [unsortedTodos, sortBy])
}

export const Todos: FC = () => {
  const { sortBy, unsortedTodos } = useTodoStore((state) => ({
    removeTodo: state.removeTodo,
    toggleTodo: state.toggleTodo,
    sortBy: state.sortBy,
    unsortedTodos: state.todos,
  }))

  const todos = useSortedList(unsortedTodos, sortBy)

  if (unsortedTodos.length === 0) {
    return <NoTodos />
  }

  return (
    <YGroup gap="$4">
      {todos.length > 0 &&
        todos.map((todo) => (
          <Animated.View key={todo.id} exiting={FadeOut}>
            <YGroup.Item>
              <ListItem>
                <TodoItem todo={todo} />
              </ListItem>
            </YGroup.Item>
          </Animated.View>
        ))}
    </YGroup>
  )
}
