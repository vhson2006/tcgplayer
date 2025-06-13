import { actions } from "components/dashboard/organisation/role/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditRoleForm from "components/dashboard/organisation/role/forms/EditForm";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";

const EditRolePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { roleId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click()
  }
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(roleId))
  }, [roleId]);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="role.view" as={Link} to={makeUrl('/dashboard/organisation/role', location)} />
        <FormButton typical='view' permission="role.view" as={Link} to={makeUrl(`/dashboard/organisation/role/${roleId}`, location)} />
        <FormButton typical='save' permission="role.update" onClick={submitHandler} />
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <EditRoleForm lang={lang} submitRef={submitRef}/>} />
    </Fragment>
  )
}

export default EditRolePage;