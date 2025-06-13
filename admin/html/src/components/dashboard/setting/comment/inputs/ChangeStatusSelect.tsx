import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';

const ChangeStatusSelect = (props: any) => {
  const { value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { commentStatus } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(commentStatus) && commentStatus.length < 1) {
      dispatch(actions.FETCH_COMMENT_STATUS())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_COMMENT_STATUS())
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
      options={commentStatus}
      errorMessage={""}
    /> 
  )
}

export default ChangeStatusSelect