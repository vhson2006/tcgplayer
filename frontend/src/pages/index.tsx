import { wrapper } from "store/wrapper";
import { Stack, Text, Container, Flex, Button, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { PageHeader } from "commons/layouts/headers";
import { HomePreview } from "components/home/HomePreview";
import { DiscoverOptions } from "components/home/DiscoverOptions";
import { renderPublicComponent } from "commons/layouts/render-component";
import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { END } from "redux-saga";
import { initialFetch } from "store/helper";
import parse from "html-react-parser";
import SimpleMap from "components/home/SimpleMap";
import CaptionCarousel from "components/Carousel";
import Hero from "components/hero";
import Customer from "components/customer";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const HomePage = (props: any) => {
  const { isServer } = props;
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch)
    }
  }, []);

  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      {/* <CaptionCarousel/> */}
      <Container flex="1">
        <ProductBreadcrumb/>
        <PageHeader title={t("home#title")} description="" />
        <Text align="left" my="5" fontSize="xl">
          {parse(t("home#information") || '')}
        </Text>
        
        <Stack
          direction={{ base: "column-reverse", lg: "row" }}
          spacing={{ base: "0", lg: "20" }}
          py="15"
        >
          <DiscoverOptions />
          <HomePreview />
        </Stack>
        {/* <SimpleMap/> */}
      </Container>
      {/* <Hero/> */}
      {/* <Customer/> */}
    </Flex>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params, query, locale }: any) => {
      const isServer = !req.url.startsWith("/_next");
      const { dispatch, sagaTask } = store
      if (isServer) {
        initialFetch(dispatch, [END], locale);
        await sagaTask.toPromise();
      }

      return {
        props: {
          isServer,
        },
      };
    }
);
export default HomePage;
