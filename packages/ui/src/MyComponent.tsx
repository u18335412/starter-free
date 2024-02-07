import { YStack, styled } from 'tamagui'

export const MyComponent = styled(YStack, {
  name: 'MyComponent',
  bc: 'red',

  variants: {
    blue: {
      true: {
        bc: 'blue',
      },
    },
  } as const,
})
