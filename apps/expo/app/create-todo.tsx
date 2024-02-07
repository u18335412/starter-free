import { CreateTodoScreen } from 'app/features/todo/create-todo-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Todo',
        }}
      />
      <CreateTodoScreen />
    </>
  )
}
