import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { t } from 'commons/languages/helper'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <Box as="section" bg="bg.surface" h='75vh'>
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading size={{ base: 'sm', md: 'md' }}>
            {t('not-found.title')}
          </Heading>
          <Text color="fg.muted" maxW="2xl" textAlign="center" fontSize="xl">
            {t('not-found.description')}
          </Text>
        </Stack>
        <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
          <Button as={Link} to={'/'}size="xl">{t('not-found.button')}</Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
)

export default NotFoundPage  