import { Stack, FormControl, FormLabel, Input, Button, Text, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { common } from "commons/consts";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { usePath } from "utils/link";
import { resetPasswordCustomer } from "components/auth/api";
import notify from "utils/notify";
import { useState } from "react";
import { makeArray } from "utils/array";

export const ResetPasswordForm = (props: any) => {
  const form = defaultForm(useForm);
  const router = useRouter();
  const { params } = usePath();
  const { t, lang } = useTranslation("common");
  const [ otp, setOtp ] = useState<any>();

  const resetPasswordHandler = async (data: any) => {
    const { retypeNewPassword: confirmPassword, newPassword: password } = data;
    try {
      if (password === confirmPassword) {
        const response = await resetPasswordCustomer({
          ...params,
          password,
          pin: otp
        }, lang)
        if (response?.status === common.INCORRECT) {
          let infor = Array.isArray(response?.message) ? response?.message[0] : response?.message
          notify.error(infor && infor !== '' ? infor : t('error#common'))
        } else {
          notify.success(t('message#reset-password'))
        }
      } else {
        notify.error(t('error#validate#retype-password'))
      }
    } catch (e) {
      console.log(e)
      router.push('/')
    }
  };

  return (
    <form onSubmit={form?.handleSubmit(resetPasswordHandler)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="new-password">
              {t("input#new-password")}
            </FormLabel>
            <Input
              id="new-password"
              type="password"
              {...form?.register("newPassword", { minLength: 8 })}
            />
            {form?.errors.newPassword && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="retype-new-password">
              {t("input#retype-new-password")}
            </FormLabel>
            <Input
              id="retype-new-password"
              type="password"
              {...form?.register("retypeNewPassword", { minLength: 8 })}
            />
            {form?.errors.retypeNewPassword && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>

        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="retype-new-password">
              {t("input#otp")}
            </FormLabel>
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
        <Stack>
          <Button variant="primary" type="submit">
            {t("button#reset-password")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
