import { Stack, Heading, HStack, Icon, Box, useColorModeValue, Button, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import { makeUrl } from "utils/link";

export const DiscoverOptions = (props: any) => {
  const bgColor = useColorModeValue("red.50", "gray.700");
  const lineColor = useColorModeValue("red.500", "red.300");
  const { t, lang } = useTranslation("common");

  return (
    <Box
      width={{ lg: "sm" }}
      transform={{ base: "translateY(-50%)", lg: "none" }}
      bg={{ base: bgColor, lg: "transparent" }}
      mx={{ base: "6", md: "8", lg: "0" }}
      px={{ base: "6", md: "8", lg: "0" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack spacing={{ base: "8", lg: "10" }}>
        <Stack spacing={{ base: "2", lg: "4" }}>
          <Heading size="xl" color={lineColor}>
            {t("home#summary")}
          </Heading>
          <Text textStyle="md" >
            {t("home#content")}
          </Text>
        </Stack>
        <HStack>
          <NextLink href={makeUrl('/product', lang)} passHref>
            <Button variant="link" color={lineColor} fontWeight="bold" fontSize="lg">
              {t("home#find-action")}
            </Button>
          </NextLink>
          <Icon color={lineColor} as={FaArrowRight} />
        </HStack>
        <HStack>
          <NextLink color={lineColor} href={makeUrl('/auth/login', lang)}>
            <Button variant="link" color={lineColor} fontWeight="bold" fontSize="lg">
              {t("home#sell-action")}
            </Button>
          </NextLink>
          <Icon color={lineColor} as={FaArrowRight} />
        </HStack>
      </Stack>
    </Box>
  );
};
