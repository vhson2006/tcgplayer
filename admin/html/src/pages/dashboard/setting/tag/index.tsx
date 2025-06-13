import { Stack, Box } from '@chakra-ui/react'
import SearchTagForm from 'components/dashboard/setting/tag/forms/SearchForm';
import { actions } from 'components/dashboard/setting/tag/slice';
import TagList from 'components/dashboard/setting/tag/tables/List';
import MultiLanguageTabs from 'modules/others/MultiLanguageTabs';
import Pagination from 'modules/others/Pagination'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from 'utils/link';

export const TagPage = () => {
  const { total } = useSelector((state: any) => state.tagReducer); 
  const dispatch = useDispatch();
  const { params, fullPath } = usePath();

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, []);
  
  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, [fullPath]);

  return (
    <Stack spacing={{ base: '8', lg: '6' }}>
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <Stack spacing="5">
          <Box px={{ base: '4', md: '6' }} pt="5">
            <SearchTagForm/>
          </Box>
          <Box px={{ base: '4', md: '6' }} overflowX="scroll">
            <MultiLanguageTabs renderPanel={(lang: string) => <TagList lang={lang}/>} />
          </Box>
          <Box px={{ base: '4', md: '6' }} pb="5">
            <Stack alignItems='center'>
              <Pagination total={total}/>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

export default TagPage;