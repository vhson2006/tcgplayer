import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "commons/messages/ErrorMessage";
import { Box, Container, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import nProgress from "nprogress";
import { PageHeader } from "commons/layouts/headers";
import useTranslation from "next-translate/useTranslation";
import { renderPrivateComponent } from "commons/layouts/render-component";
import OrderList from "components/profile/tables/List";
import ProfileCard from "components/profile/components/ProfileCard";
import ChangePassword from "components/profile/components/ChangePassword";
import ProductBreadcrumb from "commons/layouts/breadcrumb";

const ProfilePage = (props: any) => {
  const { t } = useTranslation("common");
  const { isError, isRequesting } = useSelector(({ profile }: any) => profile);

  useEffect(() => {
    isRequesting ? nProgress.start() : nProgress.done();
  }, [isRequesting]);

  if (isError) return <ErrorMessage message={t('error#common')} />;

  return renderPrivateComponent(
    <Flex as="main" role="main" direction="column" flex="1" bg={'#f5f5fa'}>
      <Container flex="1">
        <ProductBreadcrumb/>
        <Box maxW="6xl" mx="auto" my="5">
          <PageHeader title={t("seo#profile#title")} description="" />
          <Tabs isLazy key="lg" size="lg"  variant="underline">
            <TabList>
              <Tab>{t('profile#tabs#info')}</Tab>
              <Tab>{t('profile#tabs#order')}</Tab>
              {/* <Tab>{t('profile#tabs#change-password')}</Tab> */}
            </TabList>
            <TabIndicator />
            <TabPanels>
              <TabPanel>
                <ProfileCard  />
              </TabPanel>
              <TabPanel>
                <OrderList/>
              </TabPanel>
              {/* <TabPanel>
                <ChangePassword/>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Flex>
  );
};

export default ProfilePage;
