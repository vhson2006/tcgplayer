import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { t } from "commons/languages/helper";
import { FormButton } from "modules/buttons/FormButton";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "commons/modals/slice";
import MassChangeCommentForm from "components/dashboard/setting/comment/forms/ChangeComment";

export const MASS_CHANGE_COMMENT_MODAL = 'MASS_CHANGE_COMMENT_MODAL';

const MassChangeCommentModal = (props: any) => {
  const buttonRef = useRef<any>(null);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.CLOSE_MODAL(MASS_CHANGE_COMMENT_MODAL))
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.mass-change-comment.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <MassChangeCommentForm buttonRef={buttonRef}/>
        </ModalBody>
        <ModalFooter>
          <FormButton typical='cancel' mr={3} onClick={onClose}/>
          <FormButton typical='confirm' onClick={() => { buttonRef.current.click() }} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MassChangeCommentModal