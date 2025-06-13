import { Stack, Button, Text, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { common } from "commons/consts";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { registerCustomer } from "components/auth/api";
import { defaultForm } from "utils/form";
import notify from "utils/notify";

export const RegisterForm = (props: any) => {
  const form = defaultForm(useForm);
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const registerUser = async (data: any) => {
    const { confirmPassword, password, ...bodyObj } = data;
    try {
      if (password === confirmPassword) {
        const response = await registerCustomer({...bodyObj, password}, lang)
        if (response?.status === common.INCORRECT) {
          let infor = Array.isArray(response?.message) ? response?.message[0] : response?.message
          notify.error(infor && infor !== '' ? infor : t('error#common'))
        } else {
          notify.success(t('message#registration'))
          router.push(`/`)
        }
      } else {
        notify.success(t('error#validate#retype-password'))
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <form onSubmit={form?.handleSubmit(registerUser)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="name">{t("input#name")}</FormLabel>
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
          <FormControl isRequired>
            <FormLabel htmlFor="email">{t("input#email")}</FormLabel>
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
          <FormControl isRequired>
            <FormLabel htmlFor="password">
              {t("input#password")}
            </FormLabel>
            <Input
              id="password"
              type="password"
              {...form?.register("password", { minLength: 8 })}
            />
            <FormHelperText color="muted">
              {t("error#validate#min-length-8")}
            </FormHelperText>
            {form?.errors.password && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="confirm-password">
              {t("input#retype-password")}
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              {...form?.register("confirmPassword", { minLength: 8 })}
            />
            {form?.errors.confirmPassword && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phone"> {t("input#phone")}</FormLabel>
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
          <FormControl isRequired>
            <FormLabel htmlFor="address">
              {" "}
              {t("input#address")}
            </FormLabel>
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
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("button#register")}
          </Button>
          {/* <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
              or sign up with
            </Text>
            <Divider />
          </HStack>
          <OAuthButtonGroup /> */}
        </Stack>
      </Stack>
    </form>
  );
};
