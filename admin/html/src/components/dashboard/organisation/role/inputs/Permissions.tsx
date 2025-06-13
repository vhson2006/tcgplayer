import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const PermissionsSelect = (props: any) => {
  const { isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { permissions } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(permissions) && permissions.length < 1) {
      dispatch(actions.FETCH_PERMISSIONS())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_PERMISSIONS())
  }, [activedLanguage]);
 
  return (
    <FormControl id='permissions' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.permissions.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti
          isFloating
          isRequired
          name="permissions"
          placeholder={t('input.permissions.placeholder')}
          value={value}
          onChange={onChange}
          options={permissions} 
        />
      </Stack>
    </FormControl>
  )
}

export default PermissionsSelect