import { Center, Container, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import * as logos from './Logos'

export const Customer = () => (
  <Container py={{ base: '12', md: '16' }}>
    <Stack spacing="8">
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        fontWeight="medium"
        color="fg.muted"
        textAlign="center"
      >
        These and other companies trust us
      </Text>
      <SimpleGrid gap={{ base: '4', md: '6' }} columns={{ base: 2, md: 3 }}>
        {Object.entries(logos).map(([name, Logo]) => (
          <Center
            key={name}
            bg="bg.surface"
            py={{ base: '4', md: '8' }}
            boxShadow="sm"
            borderRadius="lg"
          >
            <Logo h={{ base: '8', md: '10' }} maxW="180px" fill="fg.emphasized" />
          </Center>
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
export default Customer