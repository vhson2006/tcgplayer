import DrawerComponent from "commons/drawers";
import ModalComponent from "commons/modals";
import { useSelector } from "react-redux";

export const PublicAccess = (props: any) => {
  const { children } = props;
  const { drawer } = useSelector((state: any) => state.drawers); 
  const { modal } = useSelector((state: any) => state.modals); 

  return (
    <>
      {children}
      {drawer.map((d: any, idx: number) => <DrawerComponent key={idx} {...d}/>)}
      {modal.map((d: any, idx: number) => <ModalComponent key={idx} {...d}/>)}
    </>
  )
};
export default PublicAccess;
