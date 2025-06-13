import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const CategoryGroupSelect = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { categoryGroups } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(categoryGroups) && categoryGroups.length < 1) {
      dispatch(actions.FETCH_CATEGORY_GROUPS())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_CATEGORY_GROUPS())
  }, [activedLanguage]);
 
  return (
    <FormControl id='categoryGroup' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.category-group.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="categoryGroup"
          placeholder={t('input.category-group.placeholder')}
          value={value}
          onChange={onChange}
          options={categoryGroups} 
        />
      </Stack>
    </FormControl>
  )
}

export default CategoryGroupSelect