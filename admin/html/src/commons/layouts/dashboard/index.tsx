import { Container, Divider, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import { DashboardNavbar } from "commons/layouts/dashboard/navbar/DashboardNavbar";
import { Sidebar } from 'commons/layouts/dashboard/sidebar/Sidebar';
import Breadcrumb from "commons/layouts/dashboard/breadcrum/BreadcrumbContainer";
import NotificationComponent from "commons/layouts/dashboard/notification";
import Title from "commons/layouts/dashboard/title/TitleContainer";

const DasboardLayout = (props: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { children } = props;
  
  return (
    <Flex
      as="section"
      direction={{ base: 'column', lg: 'row' }}
      height="100%"
      // minH="100vh"
      bg="bg-canvas"
      overflowY="visible"
    >
      {isDesktop ? <Sidebar /> : <DashboardNavbar />}
      <Container height="100%" py="8" flex="1" maxW={{ base: 'full' }}>
        <Stack direction={{ base: 'row' }} justify="space-between">
          <Breadcrumb/>
          {/* {isDesktop ? <NotificationComponent variant={"secondary"}  color="fg.accent"/> : <></>} */}
        </Stack>
        <Divider py={1}/>
        <Title/>
        {children}
      </Container>
    </Flex>
  )
}


export default DasboardLayout