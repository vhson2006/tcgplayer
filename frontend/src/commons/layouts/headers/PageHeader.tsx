import { Stack, Heading, useBreakpointValue, Box, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { jsonParse } from "utils/json";

export const PageHeader = (props: any) => {
  const { title, description, ...others } = props;
  const { lang } = useTranslation("common");
  return (
    <Box pt="8" {...others}>
      <Stack spacing={{ base: "8", md: "10" }} align="center">
        <Stack spacing={{ base: "4", md: "6" }} textAlign="center">
          <Stack spacing="4">
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
              {title}
            </Heading>
          </Stack>
          <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl" color="muted">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
