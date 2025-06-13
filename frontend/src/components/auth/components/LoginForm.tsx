import { Text, Stack, FormControl, FormLabel, Input, HStack, Button } from "@chakra-ui/react";
import { common } from "commons/consts";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { makeUrl } from "utils/link";
import { useDispatch, useSelector } from "react-redux";
import { encryptPermission } from "utils/account";
import { defaultForm } from "utils/form";
import { jsonParse } from "utils/json";
import notify from "utils/notify";
import { actions } from "../slice";
import { loginCustomer } from "../api";

export const LoginForm = (props: any) => {
  const form = defaultForm(useForm);
  const dispatch = useDispatch();
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  const loginHandler = async (data: any) => {
    try {
      const response = await loginCustomer(data, lang)
      if (response?.status === common.INCORRECT) {
        let infor = Array.isArray(response?.message) ? response?.message[0] : response?.message
        notify.error(infor && infor !== '' ? infor : t('error#common'))
      } else {
        const { accessToken, refreshToken, permission } = response
        localStorage.setItem('token', accessToken)
        localStorage.setItem('refresh', refreshToken)
        localStorage.setItem('permission', encryptPermission(permission))
        dispatch(actions.SET_PERMISSION(jsonParse(permission)))
        router.push(`/`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={form?.handleSubmit(loginHandler)}>
      <Stack spacing="6">
        <Stack spacing="5">
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
            {form?.errors.password && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <HStack justify="space-between">
          <NextLink href={makeUrl('/auth/forgot-password', lang)} passHref>
            <Button variant="link" colorScheme="blue" size="sm">
              {t("login#link#forgot-password")}
            </Button>
          </NextLink>
        </HStack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("button#login")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
