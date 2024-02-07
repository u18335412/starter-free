import {
  Button,
  Form,
  H1,
  Input,
  Paragraph,
  XStack,
  YStack,
  useMedia,
  useToastController,
} from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'
import { useTodoStore } from '../store'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useState } from 'react'

export function CreateTodoScreen() {
  const [input, setInput] = useState('')
  const media = useMedia()
  const { addTodo } = useTodoStore()
  const toaster = useToastController()
  const link = useLink({
    href: '/',
  })

  const handleSubmit = () => {
    addTodo({
      id: Math.random().toString(36).substr(2, 9),
      text: input,
      completed: false,
    })
    toaster.show('Success, todo added.')
    setInput('')
  }

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInput(e.nativeEvent.text)
  }

  return (
    <XStack f={1} jc="center">
      <YStack maw={600} p={media.gtXs ? '$6' : '$4'} w="100%" f={1} jc="flex-start">
        <YStack>
          <H1 size="$8">Add new todo</H1>
          <Paragraph>Add a new todo to the list.</Paragraph>
        </YStack>
        <Form onSubmit={handleSubmit}>
          <Input size="$4" bw={2} mt="$2" value={input} onChange={onChange} />
          <Form.Trigger asChild mt="$4">
            <Button disabled={input === ''}>Add</Button>
          </Form.Trigger>
        </Form>
        <Button  mt="$10" {...link} bg="$blue8">
          <ChevronLeft size="$1" aria-hidden />
          Go Home
        </Button>
      </YStack>
    </XStack>
  )
}
