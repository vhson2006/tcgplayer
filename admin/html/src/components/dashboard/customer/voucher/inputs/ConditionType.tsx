import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const ConditionType = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { conditionType } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(conditionType) && conditionType.length < 1) {
      dispatch(actions.FETCH_CONDITION_TYPE())
    }
  }, []);

  useEffect(() => {
    dispatch(actions.FETCH_CONDITION_TYPE())
  }, [activedLanguage]);
 
  return (
    <FormControl id='conditionType' >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel minW={150} m={0}>{t('input.condition-type.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="conditionType"
          placeholder={t('input.condition-type.placeholder')}
          value={value}
          onChange={onChange}
          options={conditionType} 
        />
      </Stack>
    </FormControl>
  )
}

export default ConditionType