import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { makeUrl } from "utils/link";

interface NavButtonProps extends ButtonProps {
  icon: As;
  url: string;
  label: string;
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, url, label, ...buttonProps } = props;
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();

  return (
    <NextLink href={makeUrl(url, lang)} passHref>
      <Button
        variant="ghost-on-accent"
        justifyContent="start"
        aria-current={asPath === `/${url}` ? "page" : undefined}
        {...buttonProps}
      >
        <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="on-accent-subtle" />
          <Text>{label}</Text>
        </HStack>
      </Button>
    </NextLink>
  );
};
