import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePath } from "utils/link";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';

const SearchEmployeeRole = (props: any) => {
  const { isMulti, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { employeeRoles } = useSelector((state: any) => state.commonReducer); 
  const { params } = usePath();
  const dispatch = useDispatch();
  const defaultFilter = {...{'role': null}, ...params};

  useEffect(() => {
    if (Array.isArray(employeeRoles) && employeeRoles.length < 1) {
      dispatch(actions.FETCH_EMPLOYEE_ROLES())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_EMPLOYEE_ROLES())
  }, [activedLanguage]);
 
  useEffect(() => {
    onChange(employeeRoles.filter((op: any) => 
      Array.isArray(defaultFilter.role) ? 
      defaultFilter.role.includes(op.value) : 
      op.value === defaultFilter.role
    ));
  }, [employeeRoles]);
  
  return (
    <CustomSelect 
      isClearable
      isMulti={isMulti ? isMulti : false}
      isFloating
      // isRequired
      name="role"
      placeholder={t('input.role.placeholder')}
      value={value}
      onChange={onChange}
      options={employeeRoles} 
    />
  )
}

export default SearchEmployeeRole