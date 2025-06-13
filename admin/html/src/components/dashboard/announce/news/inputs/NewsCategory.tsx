import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";

const NewsCategory = (props: any) => {
  const dispatch = useDispatch();
  const { isMulti, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { newsCategory } = useSelector((state: any) => state.commonReducer); 

  useEffect(() => {
    if (Array.isArray(newsCategory) && newsCategory.length < 1) {
      dispatch(actions.FETCH_NEWS_CATEGORY())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_NEWS_CATEGORY())
  }, [activedLanguage]);
 
  return (
    <FormControl id="newsCategory">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.news-category.label')}</FormLabel>
        <Box w='100%'>
          <CustomSelect 
            isClearable
            isMulti={isMulti ? isMulti : false}
            isFloating
            isRequired
            name="newsCategory"
            placeholder={t('input.news-category.placeholder')}
            value={value}
            onChange={onChange}
            options={newsCategory} 
          />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default NewsCategory