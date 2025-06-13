import { actions } from "components/dashboard/organisation/role/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";
import ViewRoleForm from "components/dashboard/organisation/role/forms/ViewForm";

const DetailRolePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { roleId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(roleId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="role.view" as={Link} to={makeUrl('/dashboard/organisation/role', location)}/>
        <FormButton typical='edit' permission="role.update" as={Link} to={makeUrl(`/dashboard/organisation/role/${roleId}/edit`, location)}/>
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <ViewRoleForm lang={lang} />}/>
    </Stack>
  )
}

export default DetailRolePage;