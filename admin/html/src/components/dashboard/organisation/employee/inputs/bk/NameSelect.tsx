import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { t } from "commons/languages/helper";
import { AsyncCustomSelect } from "modules/selects";
import { usePath } from "utils/link";

const NameSelect = (props: any) => {
  const { value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { params } = usePath();
  const defaultFilter = {...{'name': null}, ...params};
  
  useEffect(() => {
    if (defaultFilter.name) {
      onChange(
        Array.isArray(defaultFilter.name) ? 
        defaultFilter.name.map((m: any) => ({ value: m.id, label: m.name })) :
        { value: defaultFilter.name?.id, label: defaultFilter.name?.name }
      )
    }
  }, [])

  useEffect(() => {
    if (defaultFilter.name) {
      onChange(
        Array.isArray(defaultFilter.name) ? 
        defaultFilter.name.map((m: any) => ({ value: m.id, label: m.name })) :
        { value: defaultFilter.name?.id, label: defaultFilter.name?.name }
      )
    } else {
      onChange(null)
    }
  }, [activedLanguage])

  return (
    <AsyncCustomSelect
      key={`${activedLanguage}-${Math.random()}`}
      isClearable
      isFloating
      isMulti={false}
      name="name"
      placeholder={t('input.name.select')}
      value={value}
      onChange={onChange}
      fetchData={() => {}} 
      postExcute={(response: any) => response.data.map((d: any) => ({
        value: d.id,
        label: d.name,
      }))}
    />
  )
}

export default NameSelect