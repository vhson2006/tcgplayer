import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { PageHeader } from "commons/layouts/headers";
import { renderPublicComponent } from "commons/layouts/render-component";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { makeUrl } from "utils/link";

const NotFoundPage = (props: any) => {
  const { t, lang } = useTranslation("common");

  return renderPublicComponent(
    <Box as="section" bg={'#f5f5fa'} h='100%' minH={'80vh'}>
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <PageHeader title={t("not-found#title")} description="" />
          <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
            <NextLink href={makeUrl('/', lang)} passHref>
              <Button fontWeight="bold" fontSize="lg">
                {t('button#back')}
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
