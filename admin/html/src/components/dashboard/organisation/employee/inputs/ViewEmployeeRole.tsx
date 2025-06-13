import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, FormLabel, InputGroup, Stack } from "@chakra-ui/react";

const ViewEmployeeRole = (props: any) => {
  const { isMulti, value, onChange, isDisabled } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { employeeRoles } = useSelector((state: any) => state.commonReducer); 
  const { detail } = useSelector((state: any) => state.employeesReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(employeeRoles) && employeeRoles.length < 1) {
      dispatch(actions.FETCH_EMPLOYEE_ROLES())
    }
  }, []);

  useEffect(() => {
    onChange(employeeRoles.filter((op: any) => op.value === detail?.role?.type))
  }, [detail.role?.type, employeeRoles]);

  useEffect(() => {
    dispatch(actions.FETCH_EMPLOYEE_ROLES())
  }, [activedLanguage]);
 
  return (
    <FormControl id='role' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.role.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating={false}
          isRequired={false}
          name="role"
          placeholder={t('input.role.placeholder')}
          value={value}
          onChange={onChange}
          options={employeeRoles} 
          isDisabled={isDisabled}
        />

      </Stack>
    </FormControl>
  )
}

export default ViewEmployeeRole