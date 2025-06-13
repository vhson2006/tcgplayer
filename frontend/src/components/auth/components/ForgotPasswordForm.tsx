import { Stack, FormControl, FormLabel, Input, Button, FormHelperText, Text } from "@chakra-ui/react";
import { common } from "commons/consts";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { forgotPasswordCustomer } from "components/auth/api";
import notify from "utils/notify";
import { createQuery } from "utils/link";

export const ForgotPasswordForm = (props: any) => {
  const form = defaultForm(useForm);
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const sendRecoveryEmail = async (data: any) => {
    try {
      const response = await forgotPasswordCustomer(data, lang)
      if (response?.status === common.INCORRECT) {
        let infor = Array.isArray(response?.message) ? response?.message[0] : response?.message
        notify.error(infor && infor !== '' ? infor : t('error#common'))
      } else {
        router.push(`/auth/reset-password?${createQuery(data)}`)
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <form onSubmit={form?.handleSubmit(sendRecoveryEmail)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="email">{t("input#email")}</FormLabel>
            <Input
              id="email"
              type="email"
              {...form?.register("email", { minLength: 4 })}
            />
            <FormHelperText color="muted">
              {t("forgot-password#form#email-hint")}
            </FormHelperText>
            {form?.errors.email && (
              <Text as="em" color="red">
                {t("error#validate#min-length-4")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("button#send-request")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
