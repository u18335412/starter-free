import { Button, XStack, YStack, H2, Paragraph } from '@my/ui'
import { ListTodo, Plus } from '@tamagui/lucide-icons'
import { FC } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useLink } from 'solito/link'

export const NoTodos: FC = () => {
  const linkProps = useLink({
    href: '/create-todo/',
  })

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
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
    </Animated.View>
  )
}
