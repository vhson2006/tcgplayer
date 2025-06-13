import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerFooter } from '@chakra-ui/react'
import { t } from 'commons/languages/helper';
import AddTagForm from 'components/dashboard/setting/tag/forms/AddForm';
import { FormButton } from 'modules/buttons/FormButton';
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { actions } from "commons/drawers/slice";

export const ADD_TAG_DRAWER = 'ADD_TAG_DRAWER';

const AddTagDrawer = (props: any) => {
  const { size } = props;
  const dispatch = useDispatch();
  const buttonRef = useRef<any>(null);

  const onClose = () => {
    dispatch(actions.CLOSE_DRAWER(ADD_TAG_DRAWER))
  }

  return (
    <Drawer
      isOpen={true}
      placement='right'
      onClose={onClose}
      size={size ? size : 'xl'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader pb={5}>{t('drawer.add-tag.title')}</DrawerHeader>
        <DrawerBody>
          <AddTagForm submitRef={buttonRef}/>
        </DrawerBody>
        <DrawerFooter>
          <FormButton typical='cancel' mr={3} onClick={onClose}/>
          <FormButton typical='confirm' onClick={() => { buttonRef.current.click() }} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddTagDrawer;