import { Stack, Box } from '@chakra-ui/react'
import SearchAccessCodeForm from 'components/dashboard/setting/access-code/forms/SearchForm';
import { actions } from 'components/dashboard/setting/access-code/slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from 'utils/link';
import AccessCodeList from 'components/dashboard/setting/access-code/tables/List';
import Pagination from 'modules/others/Pagination';

export const AccessCodePage = () => {
  const { total } = useSelector((state: any) => state.accessCodeReducer); 
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
            <SearchAccessCodeForm/>
          </Box>
          <Box px={{ base: '4', md: '6' }} overflowX="scroll">
            <AccessCodeList/>
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

export default AccessCodePage;