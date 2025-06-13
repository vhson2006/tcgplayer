import { Box, BoxProps, Button, Divider, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { common } from 'commons/consts';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { defaultForm } from 'utils/form';
import notify from 'utils/notify';
import { updateAccountInformation } from '../api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';

export const ProfileCard = (props: BoxProps) => {
  const { t, lang } = useTranslation("common");
  const form = defaultForm(useForm);
  const { detail } = useSelector((state: any) => state.profile); 
  const dispatch = useDispatch();
  
  useEffect(() => {
    form.setValue('name', detail?.name);
    form.setValue('address', detail?.address);
  }, [ detail.name, detail.address ]);
  
  useEffect(() => {
    dispatch(actions.GET_PROFILE_ASYNC({}))
  }, []);

  const updateProfile = async (data: any) => {
    try {
      const response = await updateAccountInformation(data, lang)
      if (response?.status === common.INCORRECT) {
        let infor = Array.isArray(response?.message) ? response?.message[0] : response?.message
        notify.error(infor && infor !== '' ? infor : t('error#common'))
      } else {
        notify.success(t('message#profile'))
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <form onSubmit={form?.handleSubmit(updateProfile)}>
      <Box bg="bg.surface" boxShadow="sm" borderRadius="lg" flex="1" {...props}>
        <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
          <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
            <FormControl id="name">
              <FormLabel>{t('input#name')}</FormLabel>
              <Input
                id="name"
                type="text"
                {...form?.register("name", { minLength: 4 })}
              />
              {form?.errors.name && (
                <Text as="em" color="red">
                  {t("error#validate#min-length-4")}
                </Text>
              )}
            </FormControl>
            <FormControl id="address">
              <FormLabel>{t('input#address')}</FormLabel>
              <Input
                id="address"
                type="text"
                {...form?.register("address", { minLength: 8 })}
              />
              {form?.errors.address && (
                <Text as="em" color="red">
                  {t("error#validate#min-length-8")}
                </Text>
              )}
            </FormControl>
          </Stack>
          {/* <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
            <FormControl id="phone">
              <FormLabel>{t('input#phone')}</FormLabel>
              <Input
                id="phone"
                type="tel"
                {...form?.register("phone", { minLength: 10 })}
              />
              {form?.errors.phone && (
                <Text as="em" color="red">
                  {t("error#validate#min-length-10")}
                </Text>
              )}
            </FormControl>
            <FormControl id="email">
              <FormLabel>{t('input#email')}</FormLabel>
              <Input
                id="email"
                type="email"
                {...form?.register("email", { minLength: 4 })}
              />
              {form?.errors.email && (
                <Text as="em" color="red">
                  {t("error#validate#min-length-4")}
                </Text>
              )}
            </FormControl>
          </Stack> */}
        </Stack>
        <Divider />
        <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
          <Button type="submit">{t('button#save')}</Button>
        </Flex>
      </Box>
    </form>
  )
}

export default ProfileCard