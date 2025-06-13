import { Stack, Heading, useBreakpointValue, HStack, Button, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Logo } from "modules/icons";
import NextLink from "next/link";
import { makeUrl } from "utils/link";

export const HeaderWithLogo = (props: any) => {
  const { t, lang } = useTranslation("common");
  const { title } = props;

  return (
    <Stack spacing="6">
      <Logo />
      <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
        <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
          {title}
        </Heading>
        <HStack spacing="1" justify="center">
          <Text color="muted">{t("common#header#not-register")}</Text>
            <NextLink href={makeUrl("/auth/register", lang)} passHref>
              <Button variant="link" colorScheme="blue">
                {t("common#header#register")}
              </Button>
            </NextLink>
        </HStack>
      </Stack>
    </Stack>
  );
};
