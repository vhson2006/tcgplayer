import { 
  Button, Container, FormControl, FormHelperText, 
  FormLabel, Heading, Input, Stack, Text, 
} from '@chakra-ui/react'
import { LogoIcon } from 'modules/icons';
import { Link, useLocation } from 'react-router-dom';
import { t, useFormatMessage } from 'commons/languages/helper';
import { makeUrl } from 'utils/link';
import { GiArchiveRegister } from 'react-icons/gi';

export const RegisterPage = () => {
  const location = useLocation();
  
  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <LogoIcon />
          <Stack spacing="3" textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>{t('register.title')}</Heading>
            <Text color="fg.muted">{t('register.description')}</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="name">{t('input.name.label')}</FormLabel>
              <Input id="name" type="text" placeholder={useFormatMessage({ id: 'input.name.placeholder' })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="phone">{t('input.phone.label')}</FormLabel>
              <Input id="phone" type="text" placeholder={useFormatMessage({ id: 'input.phone.placeholder' })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">{t('input.password.label')}</FormLabel>
              <Input id="password" type="password" placeholder={useFormatMessage({ id: 'input.password.placeholder' })} />
              <FormHelperText color="fg.muted">{t('input.password.hint')}</FormHelperText>
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button  leftIcon={<GiArchiveRegister />} as={Link} to={makeUrl('/authentication', location)}>{t('button.register')}</Button>
          </Stack>
        </Stack>
        <Text textStyle="sm" color="fg.muted" textAlign="center">
          {t('register.login')} <Link to={makeUrl('/authentication', location)}>{t('button.login')}</Link>
        </Text>
      </Stack>
    </Container>
  )
} 

export default RegisterPage;