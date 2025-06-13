import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerFooter } from '@chakra-ui/react'
import { t } from 'commons/languages/helper';
import AddMediaForm from 'components/dashboard/setting/media/forms/AddForm';
import { FormButton } from 'modules/buttons/FormButton';
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { actions } from "commons/drawers/slice";

export const ADD_MEDIA_DRAWER = 'ADD_MEDIA_DRAWER';

const AddMediaDrawer = (props: any) => {
  const { size } = props;
  const dispatch = useDispatch();
  const buttonRef = useRef<any>(null);

  const onClose = () => {
    dispatch(actions.CLOSE_DRAWER(ADD_MEDIA_DRAWER))
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
        <DrawerHeader pb={5}>{t('drawer.add-media.title')}</DrawerHeader>
        <DrawerBody>
          <AddMediaForm submitRef={buttonRef}/>
        </DrawerBody>
        <DrawerFooter>
          <FormButton typical='cancel' mr={3} onClick={onClose}/>
          <FormButton typical='confirm' onClick={() => { buttonRef.current.click() }} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddMediaDrawer;