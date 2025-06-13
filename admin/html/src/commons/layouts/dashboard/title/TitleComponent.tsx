import { Stack, Heading, Text } from '@chakra-ui/react';

const Title = (props: any) => {
  const { title, description } = props;

  return (
    <Stack
      spacing="4"
      py="4"
      direction={{ base: 'column', lg: 'row' }}
      justify="space-between"
      align={{ base: 'start', lg: 'center' }}
    >
      <Stack spacing="1">
        <Heading size={{ base: 'xs', lg: 'sm' }} fontWeight="medium">
          {title}
        </Heading>
        <Text color="muted">
          {description}
        </Text>
      </Stack>
    </Stack>
  )
}

export default Title;