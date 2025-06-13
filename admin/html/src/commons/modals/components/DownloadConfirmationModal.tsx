import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { t } from "commons/languages/helper";
import { useDispatch } from "react-redux";
import { actions } from "commons/modals/slice";
import { FormButton } from "modules/buttons/FormButton";

export const DOWNLOAD_CONFIRMATION_MODAL = 'DOWNLOAD_CONFIRMATION_MODAL';

const DownloadConfirmationModal = (props: any) => {
  const { next } = props;
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.CLOSE_MODAL(DOWNLOAD_CONFIRMATION_MODAL))
  }
  
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.confirm-download.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{t('modal.confirm-download.content')}</ModalBody>
        <ModalFooter>
          <FormButton typical='cancel' mr={3} onClick={onClose}/>
          <FormButton typical='confirm' onClick={next} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DownloadConfirmationModal