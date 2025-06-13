import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePath } from "utils/link";
import { AsyncCustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { common } from "commons/config";

export const getDepartment = () => {
  return {
    status: common.CORRECT,
    data: {
      name: 'Nguyen Van A',
      avatar: '/logo192.png'
    }
  }
}

const DepartmentSelect = (props: any) => {
  const { value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { params } = usePath();
  const defaultFilter = {...{'department': null}, ...params};
  
  useEffect(() => {
    if (defaultFilter.department) {
      onChange(
        Array.isArray(defaultFilter.department) ? 
        defaultFilter.department.map((m: any) => ({ value: m.id, label: m.typeName[activedLanguage], typeName: m.typeName })) :
        { value: defaultFilter.department?.id, label: defaultFilter.department?.typeName[activedLanguage], typeName: defaultFilter.department.typeName }
      )
    }
  }, [])

  useEffect(() => {
    if (defaultFilter.department) {
      onChange(
        Array.isArray(defaultFilter.department) ? 
        defaultFilter.department.map((m: any) => ({ value: m.id, label: m.typeName[activedLanguage], typeName: m.typeName })) :
        { value: defaultFilter.department?.id, label: defaultFilter.department?.typeName[activedLanguage], typeName: defaultFilter.department?.typeName }
      )
    } else {
      onChange();
    }
  }, [activedLanguage])
  
  return (
    <AsyncCustomSelect 
      key={`${activedLanguage}-${Math.random()}`}
      isClearable
      isFloating
      isMulti={false}
      name="department"
      placeholder={t('input.department.select')}
      value={value}
      onChange={onChange}
      fetchData={getDepartment} 
      postExcute={(response: any) => response.data.map((d: any) => ({
        value: d.id,
        label: d.typeName[activedLanguage],
        typeName: d.typeName,
      }))}
    /> 

  )
}

export default DepartmentSelect