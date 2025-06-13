import { Flex } from "@chakra-ui/react";
import Footer from 'commons/layouts/auth/Footer';
import AuthNavbar from "commons/layouts/auth/AuthNavbar";

const AuthLayout = (props: any) => {
  const { children} = props;
  return (
    <Flex direction="column" flex="1">
      <AuthNavbar/>
      {children}
      <Footer/>
    </Flex>
  )
}


export default AuthLayout