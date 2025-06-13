import { Box, Container, useBreakpointValue, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { MobileAccentComponent } from "commons/layouts/menus/MobileAccentComponent";
import { DesktopAccentComponent } from "commons/layouts/menus/DesktopAccentComponent";
import LangSwitcher from "commons/languages/LangSwitcher"
import { BsCart3 } from "react-icons/bs";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialFetch } from "store/helper";
import dynamic from "next/dynamic";
import { actions } from "commons/drawers/slice";
import { ADD_ORDER_DRAWER } from "components/product/popups/CartList";
import { actions as cartActions } from 'components/product/cart-slice';

const UserMenu = dynamic(() => import("./UserMenu"), { ssr: false });

const AccentMenuComponent = (props: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { list } = useSelector(({ cart }: any) => cart);
  const { lang } = useTranslation("common");
  const dispatch = useDispatch();

  useEffect(() => {
    initialFetch(dispatch);
  }, [lang]);

  useEffect(() => {
    dispatch(cartActions.GET_LIST({}))
  }, []);

  const openCart = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_ORDER_DRAWER, size: 'sm', data: {} }))
  }

  return (
    <Box as="nav" bg="bg-accent">
      <Container py={{ base: "1", lg: "2" }}>
        <Flex justify="space-between">
          <HStack spacing="4">
            {isDesktop ? <DesktopAccentComponent /> : <MobileAccentComponent />}
          </HStack>
          <HStack spacing="1">
            <Button onClick={openCart} variant="ghost-on-accent" size="lg">
              <BsCart3 />
              { 
                list.length > 0 &&
                <sup>
                  <Box bg='red' color='white' borderRadius={'50%'} w={4} h={4}>
                    <Text fontSize={12} pt={2}>{list.length}</Text>
                  </Box>
                </sup>
              }
            </Button>
            <LangSwitcher />
            <UserMenu/>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
export default AccentMenuComponent