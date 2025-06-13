import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const AccessCodeStatus = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { accessCodeStatus } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(accessCodeStatus) && accessCodeStatus.length < 1) {
      dispatch(actions.FETCH_ACCESS_CODE_STATUS())
    }
  }, []);

  useEffect(() => {
    dispatch(actions.FETCH_ACCESS_CODE_STATUS())
  }, [activedLanguage]);
 
  return (
    <FormControl id='accessCodeStatus' >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel minW={150} m={0}>{t('input.access-code-status.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="accessCodeStatus"
          placeholder={t('input.access-code-status.placeholder')}
          value={value}
          onChange={onChange}
          options={accessCodeStatus} 
        />
      </Stack>
    </FormControl>
  )
}

export default AccessCodeStatus