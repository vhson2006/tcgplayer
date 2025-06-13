import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, list, VisuallyHidden } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { actions } from "commons/modals/slice";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import notify from "utils/notify";
import { common } from "commons/consts";
import { createOrderWithGuest } from "components/product/api";
import { actions as cartActions } from 'components/product/cart-slice';
import { useRef } from "react";

export const DELIVERY_ADDRESS_MODAL = 'DELIVERY_ADDRESS_MODAL';

const DeliveryAddressModal = (props: any) => {
  const { t, lang } = useTranslation("common");
  const form = defaultForm(useForm);
  const { list } = useSelector(({ cart }: any) => cart);
  const buttonRef = useRef<any>(null);

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.CLOSE_MODAL(DELIVERY_ADDRESS_MODAL))
  }

  const addOrderWithGuest = async (data: any) => {
    const response = await createOrderWithGuest({ ...data, products: list }, lang);
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
  
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{t('drawer#shipping#information')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={form.handleSubmit(addOrderWithGuest)}>
            <FormControl>
              <FormLabel>{t('input#name')}</FormLabel>
              <Input placeholder='' {...form.register('name', {required: true})} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{t('input#address')}</FormLabel>
              <Input placeholder='' {...form.register('address', {required: true})}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{t('input#phone')}</FormLabel>
              <Input placeholder='' {...form.register('phone', {required: true})}/>
            </FormControl>
            <VisuallyHidden>
              <Button type="submit" ref={buttonRef}/>
            </VisuallyHidden>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => { buttonRef.current.click() }}>{t('button#confirm')}</Button>
          <Button onClick={onClose}>{t('button#cancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeliveryAddressModal