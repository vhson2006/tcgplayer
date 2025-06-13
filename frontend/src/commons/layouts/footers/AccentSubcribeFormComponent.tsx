import { Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaFacebook, FaTiktok  } from "react-icons/fa";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { makeUrl } from "utils/link";

export const AccentSubcribeFormComponent = (props: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <Stack
      pt="8"
      pb="4"
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      align="center"
    >
      <Text fontSize="sm" color="on-accent-subtle">
        Shanovina &copy; {new Date().getFullYear()} |&nbsp;
        <NextLink href={makeUrl(`/terms`, lang)} passHref>
          {t('footer#terms')}
        </NextLink> |&nbsp;
        <NextLink href={makeUrl(`/privacy`, lang)} passHref>
          {t('footer#privacy')}
        </NextLink>
      </Text>
      
      <ButtonGroup variant="ghost-on-accent">
        <IconButton
          as="a"
          href="#"
          aria-label="Youtube"
          icon={<FaYoutube fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Tiktok"
          icon={<FaTiktok fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Facebook"
          icon={<FaFacebook fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  );
};
