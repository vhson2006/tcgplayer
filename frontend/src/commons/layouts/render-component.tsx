
import { Flex } from "@chakra-ui/react";
import { AccentFooterComponent } from "commons/layouts/footers/AccentFooterComponent";
import { SeoHead } from "commons/layouts/headers";
import AccentMenuComponent from "commons/layouts/menus/AccentMenuComponent";
import { AuthAccess, PublicAccess, PrivateAccess } from "commons/securities";
import CountdownOnBack from "components/CountdownOnBack";
import NavWithCenteredSearch from "components/NavWithCenteredSearch";
import useTranslation from "next-translate/useTranslation";

export const renderPublicComponent = (element: any) => {
  const { t } = useTranslation("common");
  
  return (
    <PublicAccess>
      <SeoHead />
      <Flex direction="column" flex="1"  bg={'#f5f5fa'}>
        <AccentMenuComponent />
        {element}
        {/* <CountdownOnBack/> */}
        {/* <NavWithCenteredSearch child={element}/> */}
        <AccentFooterComponent />
      </Flex>
    </PublicAccess>
  )
}

export const renderAuthComponent = (element: any, isServer = false) => {
  const { t } = useTranslation("common");
  
  return (
    <AuthAccess isServer={isServer}>
      <SeoHead />
      <Flex direction="column" flex="1"  bg={'#f5f5fa'}>
        <AccentMenuComponent />
        {element}
        {/* <NavWithCenteredSearch child={element}/> */}
        <AccentFooterComponent />
      </Flex>
    </AuthAccess>
  )
}

export const renderPrivateComponent = (element: any, isServer = false) => {
  const { t } = useTranslation("common");
  
  return (
    <PrivateAccess isServer={isServer}>
      <SeoHead />
      <Flex direction="column" flex="1"  bg={'#f5f5fa'}>
        <AccentMenuComponent />
        {element}
        {/* <NavWithCenteredSearch child={element}/> */}
        <AccentFooterComponent />
      </Flex>
    </PrivateAccess>
  )
}