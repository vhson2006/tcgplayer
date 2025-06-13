import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "commons/languages/slice";
import { ButtonGroup } from "@chakra-ui/react";
import { supportLanguages } from "commons/consts";
import { PopoverSelect } from "./PopoverSelect";
import { MdOutlineLanguage } from 'react-icons/md';

const LangSwitcher = (props: any) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const dispatch = useDispatch()
  const changeLanguage = (locale: string) => {
    dispatch(actions.SET_ACTIVED_LANGAUGE(locale))
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <ButtonGroup spacing="8" display='flex'>
      <PopoverSelect 
        icon={<MdOutlineLanguage />} 
        items={Object.values(supportLanguages)
          .filter(f => f.key !== '/')
          .map((lang: any) => ({
            name: lang.name,
            href: '',
            icon: lang.icon,
            onClick: () => changeLanguage(lang.key),
          })
        )} 
      />
    </ButtonGroup>
  )
};

export default LangSwitcher;
