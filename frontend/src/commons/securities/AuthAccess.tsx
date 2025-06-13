import DrawerComponent from "commons/drawers";
import ModalComponent from "commons/modals";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginCheck } from "utils/account";

export const AuthAccess = (props: any) => {
  const { children, isServer } = props;
  const { drawer } = useSelector((state: any) => state.drawers); 
  const { modal } = useSelector((state: any) => state.modals); 
  const { lang } = useTranslation("common");
  const router = useRouter();

  useEffect(() => {
    if (!isServer) {
      if (loginCheck()) {
        router.push(lang === "vi" ? "/" : `/${lang}/`);
      }
    }
  }, []);

  return (
    <>
      {children}
      {drawer.map((d: any, idx: number) => <DrawerComponent key={idx} {...d}/>)}
      {modal.map((d: any, idx: number) => <ModalComponent key={idx} {...d}/>)}
    </>
  )
};

export default AuthAccess;
