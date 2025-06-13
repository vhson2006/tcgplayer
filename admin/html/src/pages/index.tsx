import { Badge, Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { NavButton } from 'modules/buttons/NavButton';
import { t } from 'commons/languages/helper';
import { FiLogIn } from 'react-icons/fi';

export const HomePage = (props: any) => {
  
  return (
    <Box position="relative" height={{ lg: '720px' }}>
      <Container py={{ base: '16', md: '24' }} height="full">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '16' }}
          align={{ lg: 'center' }}
          height="full"
        >
          <Stack spacing={{ base: '8', md: '12' }}>
            <Stack spacing="4">
              <Badge
                variant="pill"
                colorScheme="purple"
                alignSelf="start"
                size={{ base: 'md', md: 'lg' }}
              >
                {t('home.label')}
              </Badge>
              <Stack spacing={{ base: '4', md: '6' }} maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}>
                <Heading size={{ base: 'md', md: 'xl' }}>
                  {t('home.title')}
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted">
                  {t('home.description')}
                </Text>
              </Stack>
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
              <NavButton 
                variant='solid'
                permission={false}
                size={{ base: 'lg', md: 'xl' }}
                label="button.login" 
                href={'/authentication'} 
                icon={<FiLogIn/>}
              />
              {/* <NavButton 
                variant="secondary"
                size={{ base: 'lg', md: 'xl' }}
                label="button.register" 
                href={'/authentication/register'} 
                icon={<GiArchiveRegister/>}
              /> */}
            </Stack>
          </Stack>
          <Box
            pos={{ lg: 'absolute' }}
            right="0"
            bottom="0"
            w={{ base: 'full', lg: '50%' }}
            height={{ base: '80', lg: 'full' }}
            sx={{
              clipPath: { lg: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)' },
            }}
          >
            {/* <Img
              boxSize="full"
              objectFit="cover"
              src={href}
              alt={alt}
            /> */}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
} 
export default HomePage