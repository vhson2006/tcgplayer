import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "store/wrapper";
import { ErrorMessage } from "commons/messages/ErrorMessage";
import { Box, Center, Container, Flex } from "@chakra-ui/react";
import nProgress from "nprogress";
import { PageHeader } from "commons/layouts/headers";
import useTranslation from "next-translate/useTranslation";
import { renderPublicComponent } from "commons/layouts/render-component";
import CenterSearchForm from "components/product/components/CenterSearchForm";
import ShopGrid from "components/product/components/ShopGrid";
import ShopPagination from "components/product/components/ShopPagination";
import { actions } from "components/product/slice";
import { actions as constAction } from "commons/consts/slice";

import { escapeDoubleQuote, usePath } from "utils/link";
import { initialFetch } from "store/helper";
import ProductBreadcrumb from "commons/layouts/breadcrumb";
import FiltersWithDropdown from "components/FiltersWithDropdown";
import dynamic from "next/dynamic";
import { Gallery } from "components/product/components/Gallery";
import CaptionCarousel from "components/Carousel";
// const CaptionCarousel = dynamic(() => import("components/Carousel"), { ssr: false });

const ProductPage = (props: any) => {
  const { isServer } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { error, total, isRequesting } = useSelector(({ product }: any) => product);
  const { params, fullPath } = usePath();
  const { lang } = useTranslation("common");

  useEffect(() => {
    isRequesting ? nProgress.start() : nProgress.done();
  }, [isRequesting]);

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch, [
        actions.GET_LIST_ASYNC(params),
        constAction.FETCH_PRODUCT_TAG()
      ])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
    dispatch(constAction.FETCH_PRODUCT_TAG());
  }, [fullPath, lang]);

  if (error) return <ErrorMessage message={error.message} />;

  return renderPublicComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container flex="1">
        <ProductBreadcrumb/>
        
        {/* <FiltersWithDropdown/> */}

        <Box  mx="auto" my="5">
          <PageHeader title={t("product#title")} description="" />
          <Center>
            <CenterSearchForm />
          </Center>
          <ShopGrid />
          <Center>
            <ShopPagination total={total}/>
          </Center>
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
          constAction.FETCH_PRODUCT_TAG(),
          END
        ], locale)
        await sagaTask.toPromise();
      }
      return {
        props: {
          isServer: isServer,
        },
      };
    }
);

export default ProductPage;
