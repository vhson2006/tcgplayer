import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "store/wrapper";
import { PageProps } from "typescripts/common";
import { PageHeader } from "commons/layouts/headers";
import { Box, Center, Container, Flex, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { NewsGrid } from "components/news/components/NewsGrid";
import { actions } from 'components/news/slice';
import { renderPublicComponent } from "commons/layouts/render-component";
import { escapeDoubleQuote, usePath } from "utils/link";
import { initialFetch } from "store/helper";
import ShopPagination from "components/product/components/ShopPagination";
import { ErrorMessage } from "commons/messages/ErrorMessage";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const NewsPage = (props: PageProps) => {
  const { isServer } = props;
  const { total, isError } = useSelector(({ news }: any) => news);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { params, fullPath } = usePath();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch, [actions.GET_LIST_ASYNC(params)])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isServer) {
      dispatch(actions.GET_LIST_ASYNC(params));
    }
  }, [fullPath]);

  if (isError) return <ErrorMessage message={t('error#common')} />;

  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container flex="1">
        <ProductBreadcrumb/>
        <Box  mx="auto" my="5">
          <Stack spacing="10" shouldWrapChildren>
            <PageHeader title={t("news#title")} description="" />
            <NewsGrid />
            <Center>
              <ShopPagination total={total}/>
            </Center>
          </Stack>
        </Box>
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
        initialFetch(dispatch, [
          actions.GET_LIST_ASYNC(escapeDoubleQuote(query)), 
          END
        ], locale)
        await sagaTask.toPromise();
      }
      return {
        props: {
          isServer,
        },
      };
    }
);

export default NewsPage;
