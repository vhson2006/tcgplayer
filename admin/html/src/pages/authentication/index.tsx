import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import { LogoIcon } from 'modules/icons';
import { useNavigate } from 'react-router-dom';
import { t } from 'commons/languages/helper';
import { callJsonApi } from 'utils/api';
import { useForm } from 'react-hook-form';
import { defaultForm } from 'utils/form';
import { FormButton } from 'modules/buttons/FormButton';
import FloatTextInput from 'modules/forms/FloatTextInput';
import { common } from 'commons/config';
import notify from 'utils/notify';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'components/authentication/slice';
import { encryptPermission } from 'utils/account';
import { jsonParse } from "utils/json";

export const LoginPage = () => {
  const navigate = useNavigate();
  const form = defaultForm(useForm);
  const dispatch = useDispatch();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  const loginHandler = async (data: any) => {
    try {
      const response = await callJsonApi('POST', '/api/authentication/sign-in', data, activedLanguage)
      if (response.status === common.INCORRECT) {
        let infor = Array.isArray(response.message) ? response.message[0] : response.message
        notify.error(infor && infor !== '' ? infor : t('message.error'))
      } else {
        const { accessToken, refreshToken, permission } = response
        localStorage.setItem('token', accessToken)
        localStorage.setItem('refresh', refreshToken)
        localStorage.setItem('permission', encryptPermission(permission))
        dispatch(actions.SET_PERMISSION(jsonParse(permission)))
        navigate(`/dashboard`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <LogoIcon />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>{t('login.title')}</Heading>
            <Text color="fg.muted">{t('login.description')}</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <form onSubmit={form?.handleSubmit(loginHandler)}>
            <Stack spacing="5">
              <FloatTextInput {...form} typical='email' />
              <FloatTextInput {...form} typical='password' />
            </Stack>
            {/* <HStack justify="space-between">
              <Button as={Link} to={makeUrl('/dashboard', location)} variant="text" size="sm">
                {t('login.forgot-password')}
              </Button>
            </HStack> */}
            <Stack spacing="4" pt={6}>
              <FormButton typical="login"  type="submit"/>
            </Stack>
          </form>
        </Stack>
        {/* <Text textStyle="sm" color="fg.muted">
          {t('login.register')}<Link to={makeUrl('/authentication/register', location)}>{t('button.register')}</Link>
        </Text> */}
      </Stack>
    </Container>
  )
} 

export default LoginPage;