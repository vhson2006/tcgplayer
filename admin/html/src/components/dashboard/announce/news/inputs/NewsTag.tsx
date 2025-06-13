import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";

const NewsTag = (props: any) => {
  const dispatch = useDispatch();
  const { value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { newsTag } = useSelector((state: any) => state.commonReducer); 

  useEffect(() => {
    if (Array.isArray(newsTag) && newsTag.length < 1) {
      dispatch(actions.FETCH_NEWS_TAG())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_NEWS_TAG())
  }, [activedLanguage]);
 
  return (
    <FormControl id="newsTag">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.news-tag.label')}</FormLabel>
        <Box w='100%'>
          <CustomSelect 
            isClearable
            isMulti={true}
            isFloating
            name="newsTag"
            placeholder={t('input.news-tag.placeholder')}
            value={value}
            onChange={onChange}
            options={newsTag} 
          />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default NewsTag