import { useEffect } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'components/dashboard/organisation/employee/slice'
import {usePath } from 'utils/link'
import Pagination from 'modules/others/Pagination'
import EmployeeList from 'components/dashboard/organisation/employee/tables/List'
import SearchEmployeeForm from 'components/dashboard/organisation/employee/forms/SearchEmployee'

export const EmployeePage = () => {
  const dispatch = useDispatch();
  const { total } = useSelector((state: any) => state.employeesReducer)
  const { params, fullPath } = usePath()

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, []);
  
  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC(params));
  }, [fullPath]);

  return (
    <Stack
      bg="bg.surface" 
      spacing={{ base: '8', lg: '6' }}    
      boxShadow={{ base: 'none', md: 'sm' }}
      borderRadius={{ base: 'none', md: 'lg' }}
      style={{overflow: 'visible'}} 
      width={{base: "full", md: "full", sm: "sm"}}
    >
      <Stack spacing="5" >
        <Box px={{ base: '4', md: '6' }} pt="5">
          <SearchEmployeeForm/>
        </Box>
        <Box px={{ base: '4', md: '6' }}>
          <Box overflowX="scroll">
            <EmployeeList/>
          </Box>
        </Box>
        <Box px={{ base: '4', md: '6' }} pb="5">
          <Stack alignItems='center'>
            <Pagination total={total} />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}

export default EmployeePage;