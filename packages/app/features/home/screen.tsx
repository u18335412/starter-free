import {
  Button,
  H1,
  H2,
  ListItem,
  Paragraph,
  useToastController,
  XStack,
  YGroup,
  Text,
  YStack,
  useMedia,
  VisuallyHidden,
} from '@my/ui'
import { Check, ListTodo, Plus, Trash2 } from '@tamagui/lucide-icons'
import { FC, useEffect } from 'react'
import { useLink } from 'solito/link'
import { TTodo, useTodoStore } from '../store'

const Todos: FC<{
  data: TTodo[]
}> = ({ data }) => {
  const { removeTodo, toggleTodo, sortBy } = useTodoStore((state) => ({
    removeTodo: state.removeTodo,
    toggleTodo: state.toggleTodo,
    sortBy: state.sortBy,
  }))
  const toaster = useToastController()
  const linkProps = useLink({
    href: '/create-todo/',
  })

  if (data.length === 0) {
    return (
      <XStack jc="center">
        <YStack ai="center">
          <ListTodo
            p="$2.5"
            size="$2"
            style={{
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 50,
              width: 50,
              height: 50,
            }}
          />
          <H2 size="$8" mt="$4">
            No todos
          </H2>
          <Paragraph
            maw="$20"
            ai="center"
            jc="center"
            style={{
              textAlign: 'center',
            }}
          >
            Get started by adding a new todo item. You can add as many as you like.
          </Paragraph>
          <Button {...linkProps} mt="$4">
            <Plus size="$1" aria-hidden />
            Add Todo
          </Button>
        </YStack>
      </XStack>
    )
  }


  return (
    <YGroup>
      {data.length > 0 &&
        data
          .sort((a, b) => {
            if (sortBy === 'asc') {
              return Number(b.completed) - Number(a.completed)
            } else if (sortBy === 'desc') {
              return Number(a.completed) - Number(b.completed)
            }

            return 0
          })
          .map((todo) => (
            <YGroup.Item key={todo.id}>
              <ListItem>
                <XStack jc="space-between" f={1}>
                  <XStack ai="center" gap="$4">
                    {/* For some reason this Checkbox is showing an error during mount and state change on mobile  */}
                    {/* <Checkbox
                  onCheckedChange={() => {
                    toggleTodo(todo.id)
                  }}
                  defaultChecked={todo.completed}
                  size="$4"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox> */}
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
              </ListItem>
            </YGroup.Item>
          ))}
    </YGroup>
  )
}

export function HomeScreen() {
  const [todos, sortBy, toggleSortBy] = useTodoStore((state) => [
    state.todos,
    state.sortBy,
    state.toggleSortBy,
  ])
  const linkProps = useLink({
    href: '/create-todo/',
  })
  const media = useMedia()

  return (
    <XStack
      f={1}
      jc="center"
      style={{
        position: 'relative',
      }}
    >
      <YStack gap="$10" bg="$gray5Dark" maw={600} p={media.gtXs ? '$6' : '$4'} w="100%">
        <XStack jc="space-between" ai="center" ac="center">
          <H1 size="$2">Todo App</H1>
          {media.gtSm ? (
            <XStack gap="$2">
              <Button
                onPress={() => {
                  toggleSortBy()
                }}
              >
                {sortBy === 'asc' ? 'Completed first' : 'Incomplete first'}
              </Button>
              <Button {...linkProps}>
                <Plus size="$1" aria-hidden />
                Add Todo
              </Button>
            </XStack>
          ) : (
            <Button
              onPress={() => {
                toggleSortBy()
              }}
            >
              {sortBy === 'asc' ? 'Completed first' : 'Incomplete first'}
            </Button>
          )}
        </XStack>

        {media.sm && (
          <Button
            {...linkProps}
            style={{
              position: 'fixed',
              bottom: -500,
              right: -290,
              borderRadius: 50,
              width: 60,
              height: 60,
              zIndex: 99999,
            }}
          >
            <Plus size="$1" aria-hidden />
            <VisuallyHidden>
              <Text>Add Todo</Text>
            </VisuallyHidden>
          </Button>
        )}
        <Todos data={todos} />
      </YStack>
    </XStack>
  )
}
