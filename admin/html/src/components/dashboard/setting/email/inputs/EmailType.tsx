import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const EmailType = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { emailType } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(emailType) && emailType.length < 1) {
      dispatch(actions.FETCH_EMAIL_TYPE())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_EMAIL_TYPE())
  }, [activedLanguage]);
 
  return (
    <FormControl id='emailType' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.email-type.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="emailType"
          placeholder={t('input.email-type.placeholder')}
          value={value}
          onChange={onChange}
          options={emailType} 
        />
      </Stack>
    </FormControl>
  )
}

export default EmailType