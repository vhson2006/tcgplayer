import { Box, Container, Flex, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { PageHeader } from "commons/layouts/headers";
import { renderPublicComponent } from "commons/layouts/render-component";
import useTranslation from "next-translate/useTranslation";
import parse from "html-react-parser";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const TermsAndConditionPage = (props: any) => {
  const { t, lang } = useTranslation("terms");
  const { t: tHead } = useTranslation("common");

  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Box as="section" bg="bg.surface" h='100%' minH={'80vh'} pb={20}>
        <Container flex="1">
          <ProductBreadcrumb/>
          <Stack >
            <PageHeader title={tHead("terms#title")} description="" pb="5"/>
            <Text fontWeight="bold" as="u">{t('head#1')}</Text>
            <p>{t('body#1')}</p>
            <Text fontWeight="bold" as="u">{t('head#2')}</Text>
            <p>{t('body#2')}</p>
            <Text fontWeight="bold" as="u">{t('head#3')}</Text>
            <UnorderedList>
              <ListItem ml="5">{t('body#3#a')}</ListItem>
              <ListItem ml="5">{t('body#3#b')}</ListItem>
              <ListItem ml="5">{t('body#3#c')}</ListItem>
            </UnorderedList>
            <Text fontWeight="bold" as="u">{t('head#4')}</Text>
            <UnorderedList>
              <ListItem ml="5">{t('body#4#a')}</ListItem>
              <ListItem ml="5">{t('body#4#b')}</ListItem>
            </UnorderedList>
            <Text fontWeight="bold" as="u">{t('head#5')}</Text>
            <UnorderedList>
              <ListItem ml="5">{t('body#5#a')}</ListItem>
              <ListItem ml="5">{t('body#5#b')}</ListItem>
            </UnorderedList>
            <Text fontWeight="bold" as="u">{t('head#6')}</Text>
            <p>{t('body#6')}</p>
            <Text fontWeight="bold" as="u">{t('head#7')}</Text>
            <p>{t('body#7')}</p>
            <Text fontWeight="bold" as="u">{t('head#8')}</Text>
            <p>{t('body#8')}</p>
            <Text fontWeight="bold" as="u">{t('head#9')}</Text>
            <p>{parse(t('body#9') || '')}</p>
          </Stack>
        </Container>
      </Box>
    </Flex>
  );
};

export default TermsAndConditionPage;
