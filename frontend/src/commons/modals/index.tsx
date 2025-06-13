import dynamic from "next/dynamic";
import { DELETE_CONFIRMATION_MODAL } from "commons/modals/components/DeleteConfirmationModal";
import { DELIVERY_ADDRESS_MODAL } from "commons/modals/components/DeliveryAddressModal";
import { DOWNLOAD_CONFIRMATION_MODAL } from "commons/modals/components/DownloadConfirmationModal";

const DeleteConfirmationModal = dynamic(() => import("commons/modals/components/DeleteConfirmationModal"), { ssr: false });
const DownloadConfirmationModal = dynamic(() => import("commons/modals/components/DownloadConfirmationModal"), { ssr: false });
const DeliveryAddressModal = dynamic(() => import("commons/modals/components/DeliveryAddressModal"), { ssr: false });

const ModalComponent = (props: any) => {
  const { type, data = {} } = props;
  switch(type) {
    case DELETE_CONFIRMATION_MODAL: 
      return <DeleteConfirmationModal {...data}/>
    
    case DOWNLOAD_CONFIRMATION_MODAL:
      return <DownloadConfirmationModal {...data}/>

    case DELIVERY_ADDRESS_MODAL:
      return <DeliveryAddressModal {...data}/>
  }
  
  return <></>
}

export default ModalComponent;