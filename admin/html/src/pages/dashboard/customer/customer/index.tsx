import { Stack, Box } from '@chakra-ui/react'
import SearchCustomerForm from 'components/dashboard/customer/customer/forms/SearchForm';
import { actions } from 'components/dashboard/customer/customer/slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from 'utils/link';
import CustomerList from 'components/dashboard/customer/customer/tables/List';
import Pagination from 'modules/others/Pagination';

export const CustomerPage = () => {
  const { total } = useSelector((state: any) => state.customerReducer); 
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
            <SearchCustomerForm/>
          </Box>
          <Box px={{ base: '4', md: '6' }} overflowX="scroll">
            <CustomerList/>
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

export default CustomerPage;