import { wrapper } from "store/wrapper";
import { Stack, Box, Accordion, SimpleGrid, Image, Flex, Container } from "@chakra-ui/react";
import { PageHeader } from "commons/layouts/headers";
import { renderPublicComponent } from "commons/layouts/render-component";
import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { END } from "redux-saga";
import { initialFetch } from "store/helper";
import { jobListings, JobPosting } from "components/contact/JobPosting";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const ContactPage = (props: any) => {
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
      <Container flex="1">
        <ProductBreadcrumb/>
        <PageHeader title={t("contact#title")} description="" />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} py="15" minH={'60vh'}>
          <Accordion defaultIndex={0}>
            {jobListings.map((listing, id) => (
              <JobPosting key={id} {...listing} />
            ))}
          </Accordion>
          <Stack spacing={{ base: '4', md: '6' }} minW={360} minH={360}>
            {/* <SimpleMap/> */}
            {/* <LeafletMap/> */}
            <Image
              src="https://res.cloudinary.com/datasource/image/upload/v1731770871/shanovina/rvogfsg7mfvauf4ieg1d.png"
              alt="Shanovina"
            />
          </Stack>
        </SimpleGrid>
      </Container>
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
export default ContactPage;
