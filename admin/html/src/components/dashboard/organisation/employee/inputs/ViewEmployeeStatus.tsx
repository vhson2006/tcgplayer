import { FormControl, Stack, FormLabel, InputGroup } from "@chakra-ui/react";
import { t } from "commons/languages/helper";
import { CustomSelect } from "modules/selects";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "commons/const/slice";

const ViewEmployeeStatus = (props: any) => {
  const { value, onChange, isDisabled } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { employeeStatuses } = useSelector((state: any) => state.commonReducer); 
  const { detail } = useSelector((state: any) => state.employeesReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(employeeStatuses) && employeeStatuses.length < 1) {
      dispatch(actions.FETCH_EMPLOYEE_STATUSES())
    }
  }, []);

  useEffect(() => {
    onChange(employeeStatuses.filter((op: any) => op.value === detail?.status?.type))
  }, [detail.status?.type, employeeStatuses]);

  useEffect(() => {
    dispatch(actions.FETCH_EMPLOYEE_STATUSES())
  }, [activedLanguage]);
  
  return (
    <FormControl id='role' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.status.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
          <CustomSelect 
            isClearable
            isRequired={false}
            isFloating={false}
            name="status"
            placeholder={t('input.status.select')}
            value={value}
            onChange={onChange}
            options={employeeStatuses}
            errorMessage={""}
            isDisabled={isDisabled}
          /> 
      </Stack>
    </FormControl>
  )
}

export default ViewEmployeeStatus