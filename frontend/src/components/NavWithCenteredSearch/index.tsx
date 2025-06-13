import {
  Box,
  Center,
  Flex,
  HStack,
  useColorModeValue as mode,
  useBreakpointValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { MdMenu } from 'react-icons/md'
import { RiHeartLine, RiShoppingCartLine } from 'react-icons/ri'
import { LanguageSelect } from './LanguageSelect'
import { Logo } from './Logo'
import { CartCount } from './CartCount'
import { MobileBottomNav } from './MobileBottomNav'
import { NavAction } from './NavAction'
import { NavCategoryMenu } from './NavCategoryMenu'
import { NavCategorySubmenu } from './NavCategorySubmenu'
import { SearchInput } from './SearchInput'
import { MobileAccentComponent } from 'commons/layouts/menus/MobileAccentComponent'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialFetch } from 'store/helper'
import { actions as cartActions } from 'components/product/cart-slice';
import { actions } from "commons/drawers/slice";
import { ADD_ORDER_DRAWER } from 'components/product/popups/CartList'
import { TbUserPlus } from 'react-icons/tb'
import { loginCheck } from 'utils/account'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { actions as authActions } from "components/auth/slice";

const NavWithCenteredSearchMobile = ({child}: any) => {
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_ORDER_DRAWER, size: 'sm', data: {} }))
  }
  return (
    <Flex direction="column" pb="4.5rem" overflow="hidden" display={{ base: 'flex', lg: 'none' }}>
      <Box px="4" py="4" borderBottomWidth="1px" overflow="auto">
        <Flex align="center" justify="space-between" mb="3" display={{ base: 'flex', lg: 'none' }}>
          <HStack spacing="3">
            <Center w="8" h="8">

              <MobileAccentComponent/>
             </Center>
             <Logo h="3" />
            </HStack>
           <Box>
             <LanguageSelect />
           </Box>
         </Flex>
         <SearchInput />
       </Box>
      
       {child}
      
       <MobileBottomNav onClick={openCart}/>
     </Flex>
  )
}

const NavWithCenteredSearchDesktop = ({child}: any) => {
  const { list } = useSelector(({ cart }: any) => cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_ORDER_DRAWER, size: 'sm', data: {} }))
  }

  const logout = () => {
    dispatch(authActions.SET_PERMISSION(undefined))
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    localStorage.removeItem('permission')
    router.push('/')
  }

  return (
    <Box minH="100vh" display={{ base: 'none', lg: 'block' }}>
      <Box px="8" bg={mode('white', 'gray.800')}>
        <Flex height="4.5rem" align="center" maxW="10xl" mx="auto">
          <HStack flex="24rem" spacing="32px">
            <Logo h="3" />
            
            <Box flexShrink={0}>
              <LanguageSelect />
            </Box>
          </HStack>
          <Box width="full" mx="8">
            <SearchInput />
          </Box>
          <HStack spacing="8" flexShrink={0}>
            {
              loginCheck() ? 
              <>
                <NavAction.Desktop label="menu#user#profile" icon={IoInformationCircleOutline} href='/profile'/>
                <NavAction.Desktop label="menu#user#logout" icon={FiLogOut} href='#' onClick={() => logout()}/>
              </> : 
              <>
                <NavAction.Desktop label="button#register" icon={TbUserPlus} href='/auth/register'/>
                <NavAction.Desktop label="button#login" icon={AiOutlineUser} href='/auth/login'/>
              </>
            }
            
            <Box position="relative">
              <NavAction.Desktop label="button#cart" icon={RiShoppingCartLine} onClick={openCart}/>
              {list.length > 0 && <CartCount>{list.length}</CartCount>} 
            </Box>
          </HStack>
        </Flex>
      </Box>
      <NavCategoryMenu.Desktop />
      {/* <NavCategorySubmenu.Desktop /> */}
      {child}
      <Box bg="blackAlpha.400" pos="fixed" zIndex="-1" inset="0" />
    </Box>
  )
}
export const NavWithCenteredSearch = ({child}: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const dispatch = useDispatch();
  const { t, lang } = useTranslation("common");
  useEffect(() => {
    dispatch(cartActions.GET_LIST({}))
  }, []);

  useEffect(() => {
    initialFetch(dispatch);
  }, [lang]);

  return isDesktop ? <NavWithCenteredSearchDesktop child={child}/> : <NavWithCenteredSearchMobile child={child}/>
}
export default NavWithCenteredSearch