import { Box, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'components/dashboard/announce/news/slice';
import { useEffect } from 'react';
import { usePath } from 'utils/link';
import SearchNewsForm from 'components/dashboard/announce/news/forms/SearchForm';
import Pagination from 'modules/others/Pagination'
import NewsList from 'components/dashboard/announce/news/tables/List';
import MultiLanguageTabs from 'modules/others/MultiLanguageTabs';

export const AnnouncePage = () => {
  const { total } = useSelector((state: any) => state.newsReducer); 
  const dispatch = useDispatch();
  const { params, fullPath } = usePath();

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, []);

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, [fullPath]);
  
  return (
    <Stack
      spacing={{ base: '8', lg: '6' }}
      bg="bg.surface"
      boxShadow={{ base: 'none', md: 'sm' }}
      borderRadius={{ base: 'none', md: 'lg' }}
      width={{base: "full", md: "full", sm: "sm"}}
    >
      <Stack spacing="5">
        <Box px={{ base: '4', md: '6' }} pt="5">
          <SearchNewsForm/>
        </Box>
        <Box px={{ base: '4', md: '6' }} overflowX="scroll">
          <MultiLanguageTabs renderPanel={(lang: string) => <NewsList lang={lang}/>} />
        </Box>
        <Box px={{ base: '4', md: '6' }} pb="5">
          <Stack alignItems='center'>
            <Pagination total={total}/>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}

export default AnnouncePage;