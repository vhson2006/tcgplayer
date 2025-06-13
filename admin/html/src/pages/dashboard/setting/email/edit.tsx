import { actions } from "components/dashboard/setting/email/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditEmailForm from "components/dashboard/setting/email/forms/EditForm";

const EditEmailPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { emailId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(emailId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="email.view" as={Link} to={makeUrl('/dashboard/setting/email', location)} />
        <FormButton typical='view' permission="email.view" as={Link} to={makeUrl(`/dashboard/setting/email/${emailId}`, location)} />
        <FormButton typical='save' permission="email.update" onClick={submitHandler} />
      </HStack>
      <EditEmailForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditEmailPage;