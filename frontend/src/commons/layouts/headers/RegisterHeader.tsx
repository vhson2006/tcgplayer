import { Stack, Heading, HStack, Button, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Logo } from "modules/icons";
import NextLink from "next/link";
import { makeUrl } from "utils/link";

export const RegisterHeader = (props: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <Stack spacing="6" align="center">
      <Logo />
      <Stack spacing="3" textAlign="center">
        <Heading size="xs">{t("button#register")}</Heading>
        <HStack justify="center" spacing="1">
          <Text color="muted">{t("common#header#already")}</Text>
            <NextLink href={makeUrl('/auth/login', lang)} passHref>
              <Button variant="link" colorScheme="blue">
                {t("common#header#login")}
              </Button>
            </NextLink>
        </HStack>
      </Stack>
    </Stack>
  );
};
