import { Select, useColorModeValue } from '@chakra-ui/react'
import { supportLanguages } from 'commons/consts';
import { actions } from "commons/languages/slice";
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const LanguageSelect = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const dispatch = useDispatch()
  const { t, lang } = useTranslation("common");
  
  const changeLanguage = (locale: string) => {
    dispatch(actions.SET_ACTIVED_LANGAUGE(locale))
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <Select
      border="0"
      color={useColorModeValue('gray.600', 'gray.300')}
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      fontWeight="medium"
      fontSize="sm"
      defaultValue={lang}
      aria-label="Select Language"
      onChange={(e: any) => changeLanguage(e.target.value)}
    >
      {
        Object.values(supportLanguages)
          .filter(f => f.key !== '/')
          .map((ele: any, index) => <option key={index} value={ele.key}>{t(ele.name)}</option>)
      }
      
    </Select>
  )
}
