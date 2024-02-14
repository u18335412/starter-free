import { useToastController, XStack, Button, Text } from '@my/ui'
import { Check, Trash2 } from '@tamagui/lucide-icons'
import { TTodo, useTodoStore } from '../../store'

export const TodoItem = ({ todo }: { todo: TTodo }) => {
  const { removeTodo, toggleTodo } = useTodoStore((state) => ({
    removeTodo: state.removeTodo,
    toggleTodo: state.toggleTodo,
    sortBy: state.sortBy,
  }))

  const toaster = useToastController()

  return (
    <XStack jc="space-between" f={1}>
      <XStack ai="center" gap="$4">
        <Button
          style={{
            borderRadius: 5,
            padding: 2,
            width: 20,
            height: 20,
          }}
          onPress={() => {
            toggleTodo(todo.id)
          }}
        >
          {todo.completed && <Check />}
        </Button>
        <Text>{todo.text}</Text>
      </XStack>
      <Button
        onPress={() => {
          removeTodo(todo.id)
          toaster.show('Todo removed.')
        }}
        style={{
          borderRadius: 5,
          padding: '2px',
          width: 40,
          height: 40,
        }}
      >
        <Trash2
          style={{
            width: 16,
            height: 16,
          }}
        />
      </Button>
    </XStack>
  )
}
