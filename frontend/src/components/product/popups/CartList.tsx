import {
  Button, Heading, HStack, Stack, Text, useColorModeValue,
  Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay,
  Center,
} from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { useDispatch, useSelector,  } from 'react-redux'
import { actions } from 'commons/drawers/slice'
import { createOrder } from '../api'
import useTranslation from 'next-translate/useTranslation'
import { PriceTag } from './PriceTag'
import { loginCheck } from 'utils/account'
import { useRouter } from 'next/router'
import { common } from 'commons/consts'
import notify from 'utils/notify'
import { actions as cartActions } from 'components/product/cart-slice';
import { useEffect } from 'react'
import { actions as modalActions } from 'commons/modals/slice'
import { DELIVERY_ADDRESS_MODAL } from 'commons/modals/components/DeliveryAddressModal'

export const ADD_ORDER_DRAWER = 'ADD_ORDER_DRAWER'

export const AddOrderDrawer = (props: any) => {
  const { list } = useSelector(({ cart }: any) => cart);
  const { size } = props;
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();

  const onClose = () => {
    dispatch(actions.CLOSE_DRAWER(ADD_ORDER_DRAWER))
  }

  const addOrder = async () => {
    dispatch(modalActions.OPEN_MODAL({ type: DELIVERY_ADDRESS_MODAL }));
  }

  const makeOrder = async () => {
    const response = await createOrder({ products: list }, lang);
    if (response?.status === common.INCORRECT) {
      if (response?.message) {
        notify.error(response?.message)
      } else {
        notify.error(t('error#common'))
      }
    } else {
      dispatch(cartActions.RESET({}))
      onClose();
      notify.success(t('message#cart'))
    }
  }

  const onChangeQuantity = (value: number, id: string) => {
    dispatch(cartActions.UPDATE_LIST({ id, quantity: value }))
  }
  
  const onClickDelete = (id: any) => {
    dispatch(cartActions.REMOVE_ITEM(id))
  }

  useEffect(() => {
    dispatch(cartActions.GET_LIST({}))
  }, []);

  return (
    <Drawer
      isOpen={true}
      placement='right'
      onClose={onClose}
      size={size ? size : 'xl'}
    >
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue('white', 'gray.800')} overflowY="auto">
        <DrawerCloseButton size="lg" right={{ base: '4', md: '8' }} top="4" bg="inherit" />
        <Stack padding={{ base: '6', md: '10' }} height="full" spacing="8" overflowY="auto">
          <Heading size="sm">{t('drawer#cart#title')}</Heading>
          <Stack spacing={{ base: '8', md: '10' }}>
            {list.map((item: any) => (
              <CartItem key={item.id} {...item} onClickDelete={onClickDelete} onChangeQuantity={onChangeQuantity}/>
            ))}
          </Stack>
        </Stack>
        <Stack borderTopWidth="1px" px={{ base: '6', md: '10' }} py="4" spacing="5">
          <Stack>
            <HStack fontSize="md" fontWeight="semibold">
              <Text flex="1">{t('drawer#cart#sum')}:</Text>
              <PriceTag 
                price={list.reduce((total: any, current: any) => total + current.quantity * current.price, 0)} 
                currency={'VND'} 
              />
              </HStack>
            {/* <HStack spacing="2" color={useColorModeValue('gray.600', 'gray.400')}>
              <Icon as={FiPackage} />
              <Text>Shipping + taxes calculated at checkout</Text>
            </HStack> */}
          </Stack>
          {
            // loginCheck() === false && 
            // <Center>
            //   <Text as='i' color="red" fontSize={'sm'}>{t('drawer#cart#hint')}</Text>
            // </Center>
          }
          {
            loginCheck() ? 
            <Button size="lg" fontSize="md" onClick={makeOrder}>
              {t('button#order')}
            </Button> :
            <Button variant="primary" onClick={addOrder}>
              {t("button#order")}
            </Button>
          }
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}

export default AddOrderDrawer