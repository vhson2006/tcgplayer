import { Flex, Box, Stack, Container, useBreakpointValue, useColorModeValue, Center } from "@chakra-ui/react";
import { RegisterHeader } from "commons/layouts/headers";
import { renderAuthComponent } from "commons/layouts/render-component";
import { RegisterForm } from "components/auth/components/RegisterForm";
import { RegisterRightBanner } from "components/auth/components/RegisterRightBanner";
import { END } from "redux-saga";
import { wrapper } from "store/wrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialFetch } from "store/helper";

const RegisterPage = (props: any) => {
  const { isServer } = props
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isServer) {
      initialFetch(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return renderAuthComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>

    <Box maxW="6xl" mx="auto" py={{ base: "6", md: "12" }}>
      <Stack direction="row" spacing="12">
        <Flex flex="1">
          <Container
            maxW="md"
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
            <Stack spacing="8">
              <RegisterHeader />
              <RegisterForm />
            </Stack>
          </Container>
        </Flex>
        <Center
          flex="1"
          px={{ lg: "8" }}
          display={{ base: "none", lg: "flex" }}
        >
          <RegisterRightBanner />
        </Center>
      </Stack>
    </Box>
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
export default RegisterPage;
