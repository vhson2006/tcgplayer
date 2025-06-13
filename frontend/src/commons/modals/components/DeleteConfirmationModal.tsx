import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { actions } from "commons/modals/slice";
import useTranslation from "next-translate/useTranslation";

export const DELETE_CONFIRMATION_MODAL = 'DELETE_CONFIRMATION_MODAL';

const DeleteConfirmationModal = (props: any) => {
  const { next } = props;
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.CLOSE_MODAL(DELETE_CONFIRMATION_MODAL))
  }
  
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.confirm-delete.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{t('modal.confirm-delete.content')}</ModalBody>
        <ModalFooter>
          {/* <FormButton typical='cancel' mr={3} onClick={onClose}/>
          <FormButton typical='confirm' onClick={next} /> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteConfirmationModal