import { Stack, Box } from '@chakra-ui/react'
import SearchEmailForm from 'components/dashboard/setting/email/forms/SearchForm';
import { actions } from 'components/dashboard/setting/email/slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from 'utils/link';
import EmailList from 'components/dashboard/setting/email/tables/List';
import Pagination from 'modules/others/Pagination';

export const EmailPage = () => {
  const { total } = useSelector((state: any) => state.emailReducer); 
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
            <SearchEmailForm/>
          </Box>
          <Box px={{ base: '4', md: '6' }} overflowX="scroll">
            <EmailList/>
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

export default EmailPage;