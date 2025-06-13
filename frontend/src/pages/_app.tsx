import App from "next/app";
import NextNProgress from "nextjs-progressbar";
import { END } from "redux-saga";
import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "store/wrapper";
import { SET_IS_SERVER } from "store/reducer";
import "pages/style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// import { theme } from "themes/blueberry";
import { theme } from 'themes/handwritten';
import "@fontsource/grape-nuts";
import "@fontsource/swanky-and-moo-moo";
import 'react-toastify/dist/ReactToastify.css';

import "@fontsource/inter/variable.css";
import "@fontsource/fira-code/variable.css";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";

// ReactGA.initialize(process.env.ga || '');
class WrappedApp extends App {
  static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        // 1. Wait for all page actions to dispatch
        const pageProps: any = {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        };

        // 2.1 Stop the saga if on server
        if (
          (ctx.req || pageProps.navigateAfterSaga) &&
          Component.getInitialProps
        ) {
          store.dispatch(END);
          await store.sagaTask.toPromise();
          // used in hydration reducer
          store.dispatch({ type: SET_IS_SERVER });
        }

        // 2.1 Stop the saga if on server and getServerSideProps is used
        const isServer = !ctx.req?.url?.startsWith("/_next");
        if (isServer && !Component.getInitialProps) {
          // used in hydration reducer
          store.dispatch({ type: SET_IS_SERVER });
        }

        // 3. Return props
        return {
          pageProps,
        };
      }
  );

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ChakraProvider theme={theme}>
        <NextNProgress />
        <ToastContainer position="bottom-right"/>
        {/* <HTML> */}
        <Component {...pageProps} />
        {/* </HTML> */}
      </ChakraProvider>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
