import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';

const ChangeEmployeeStatus = (props: any) => {
  const { value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { employeeStatuses } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(employeeStatuses) && employeeStatuses.length < 1) {
      dispatch(actions.FETCH_EMPLOYEE_STATUSES())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_EMPLOYEE_STATUSES())
  }, [activedLanguage]);
  
  return (
    <CustomSelect 
      isClearable
      isRequired={false}
      isFloating
      name="status"
      placeholder={t('input.status.select')}
      value={value}
      onChange={onChange}
      options={employeeStatuses}
      errorMessage={""}
    /> 
  )
}

export default ChangeEmployeeStatus