import { Button, H1, XStack, Text, YStack, useMedia, VisuallyHidden } from '@my/ui'
import { Plus } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'
import { useTodoStore } from '../store'
import { Todos } from './_components/Todos'

export function HomeScreen() {
  const [sortBy, toggleSortBy] = useTodoStore((state) => [state.sortBy, state.toggleSortBy])
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
        <Todos />
      </YStack>
    </XStack>
  )
}
