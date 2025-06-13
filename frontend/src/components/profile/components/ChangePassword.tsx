import { 
  Box, BoxProps, Button, Divider, Flex, FormControl, FormLabel, 
  HStack, Input, PinInput, PinInputField, Stack, Text 
} from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeArray } from 'utils/array';
import { defaultForm } from 'utils/form';

export const ChangePassword = (props: BoxProps) => {
  const [ otp, setOtp ] = useState<any>();
  const form = defaultForm(useForm);
  const { t, lang } = useTranslation("common");

  return (
    <Box bg="bg.surface" boxShadow="sm" borderRadius="lg" flex="1" {...props}>
      <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
        <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
          <FormControl id="new-password">
            <FormLabel>{t('input#new-password')}</FormLabel>
            <Input defaultValue="" />
          </FormControl>
          <FormControl id="retype-new-password">
            <FormLabel>{t('input#retype-new-password')}</FormLabel>
            <Input defaultValue="" />
          </FormControl>
        </Stack>
        <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
          <FormControl id="password">
            <FormLabel>{t('input#password')}</FormLabel>
            <Input defaultValue="" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="otp">{t("input#otp")}</FormLabel>
            <HStack>
              <PinInput otp value={otp} onChange={setOtp}>
                {makeArray(6).map((e: any, idx: any) => <PinInputField key={idx} />)}
              </PinInput>
            </HStack>
            {form?.errors.retypeNewPassword && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
      </Stack>
      <Divider />
      <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
        <Button type="submit">{t('button#update')}</Button>
        <Button mr={5}>{t('button#otp')}</Button>
      </Flex>
    </Box>
  )
}

export default ChangePassword