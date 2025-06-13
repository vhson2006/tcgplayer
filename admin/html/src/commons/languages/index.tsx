import { useLocation } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useEffect } from "react";
import { defaultLanguage, supportLanguages } from "commons/config";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "commons/languages/slice";
import { ToastContainer } from "react-toastify";
import DrawerComponent from "commons/drawers";
import ModalComponent from "commons/modals";
import vi from 'commons/languages/vi';
import en from 'commons/languages/en';

const LanguageComponent = (props: any) => {
  const { children } = props;
  const messages = { vi, en };
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { modal } = useSelector((state: any) => state.modalReducer); 
  const { drawer } = useSelector((state: any) => state.drawerReducer); 

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/').filter(e => e);
    if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
      dispatch(actions.SET_ACTIVED_LANGAUGE(path[0]))
    } else {
      dispatch(actions.SET_ACTIVED_LANGAUGE(defaultLanguage))
    }
  }, [location.pathname])

  return (
    <IntlProvider 
      messages={activedLanguage === 'vi' ? messages.vi : messages .en} 
      locale={activedLanguage} 
      defaultLocale={defaultLanguage}
    >
      <ToastContainer/>
      {drawer.map((d: any, idx: number) => <DrawerComponent key={idx} {...d}/>)}
      {modal.map((d: any, idx: number) => <ModalComponent key={idx} {...d}/>)}
      {children}
    </IntlProvider>
  )
}

export default LanguageComponent