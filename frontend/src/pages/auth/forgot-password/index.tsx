import { Flex, Container, Stack, Box, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { HeaderWithLogo } from "commons/layouts/headers";
import { renderAuthComponent } from "commons/layouts/render-component";
import { ForgotPasswordForm } from "components/auth/components/ForgotPasswordForm";
import useTranslation from "next-translate/useTranslation";
import { END } from "redux-saga";
import { wrapper } from "store/wrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialFetch } from "store/helper";

const ForgotPasswordPage = (props: any) => {
  const { isServer } = props
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return renderAuthComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container
        maxW="lg"
        py={{ base: "5", md: "10" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <HeaderWithLogo title={t("forgot-password#title")} />
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({
              base: "transparent",
              sm: "bg-surface",
            })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <ForgotPasswordForm />
          </Box>
        </Stack>
      </Container>
    </Flex>,
    isServer
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params, query, locale }: any) => {
      const isServer = !req.url.startsWith("/_next");
      const { dispatch, sagaTask } = store
      if (isServer) {
        initialFetch(dispatch, [ END ], locale)
        await sagaTask.toPromise();
      }
      return {
        props: {
          isServer,
        },
      };
    }
);
export default ForgotPasswordPage;
