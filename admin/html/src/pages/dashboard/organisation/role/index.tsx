import { Stack, Box } from '@chakra-ui/react'
import { actions } from 'components/dashboard/organisation/role/slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from 'utils/link';
import RoleList from 'components/dashboard/organisation/role/tables/List';
import MultiLanguageTabs from 'modules/others/MultiLanguageTabs';
import Pagination from 'modules/others/Pagination'
import SearchRoleForm from 'components/dashboard/organisation/role/forms/SearchForm';

export const RolePage = () => {
  const { total } = useSelector((state: any) => state.roleReducer); 
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
            <SearchRoleForm/>
          </Box>
          <Box px={{ base: '4', md: '6' }} overflowX="scroll">
            <MultiLanguageTabs renderPanel={(lang: string) => <RoleList lang={lang}/>} />
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

export default RolePage;