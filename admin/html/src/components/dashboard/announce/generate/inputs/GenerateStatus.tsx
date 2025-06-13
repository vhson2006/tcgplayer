import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const GenerateStatus = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { generateStatus } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(generateStatus) && generateStatus.length < 1) {
      dispatch(actions.FETCH_GENERATE_STATUS())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_GENERATE_STATUS())
  }, [activedLanguage]);
 
  return (
    <FormControl id='generateStatus' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.generate-status.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="generateStatus"
          placeholder={t('input.generate-status.placeholder')}
          value={value}
          onChange={onChange}
          options={generateStatus} 
        />
      </Stack>
    </FormControl>
  )
}

export default GenerateStatus