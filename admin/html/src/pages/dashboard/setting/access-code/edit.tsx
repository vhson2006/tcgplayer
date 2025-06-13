import { actions } from "components/dashboard/setting/access-code/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditAccessCodeForm from "components/dashboard/setting/access-code/forms/EditForm";

const EditAccessCodePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { accessCodeId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(accessCodeId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="accesscode.view" as={Link} to={makeUrl('/dashboard/setting/access-code', location)} />
        <FormButton typical='view' permission="accesscode.view" as={Link} to={makeUrl(`/dashboard/setting/access-code/${accessCodeId}`, location)} />
        <FormButton typical='save' permission="accesscode.update" onClick={submitHandler} />
      </HStack>
      <EditAccessCodeForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditAccessCodePage;