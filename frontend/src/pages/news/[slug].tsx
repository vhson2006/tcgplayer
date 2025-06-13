import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageHeader } from "commons/layouts/headers";
import { ErrorMessage } from "commons/messages/ErrorMessage";
import { wrapper } from "store/wrapper";
import { Box, Container, Flex } from "@chakra-ui/react";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import { renderPublicComponent } from "commons/layouts/render-component";
import { actions } from "components/news/slice";
import { useDispatch, useSelector } from "react-redux";
import { jsonParse } from "utils/json";
import useTranslation from "next-translate/useTranslation";
import { END } from "redux-saga";
import { initialFetch } from "store/helper";
import { usePath } from "utils/link";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const DetailNewPage = (props: any) => {
  const { isServer } = props;
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { detail, isError } = useSelector(({ news }) => news); 
  const { t, lang } = useTranslation("common");
  const { fullPath } = usePath();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch, [actions.GET_DETAIL_BY_SLUG_ASYNC(slug)])
    }
  }, []);

  useEffect(() => {
    if (!isServer) {
      dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(slug))
    }
  }, [fullPath]);

  if (isError) return <ErrorMessage message={t('error#common')} />;

  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container flex="1">
        <ProductBreadcrumb/>
        <Box className="ql-editor" mb="50" pb="50">
          <PageHeader title={jsonParse(detail.title)[lang] || '' } description="" />
          <div id="editor" className="editor">
            {parse(jsonParse(detail?.content)[lang] || '')}
          </div>
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
      const { slug } = params;
      if (isServer) {
        initialFetch(dispatch, [
          actions.GET_DETAIL_BY_SLUG_ASYNC(slug),
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

export default DetailNewPage;
