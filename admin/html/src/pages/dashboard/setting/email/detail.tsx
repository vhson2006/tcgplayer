import { actions } from "components/dashboard/setting/email/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewEmailForm from "components/dashboard/setting/email/forms/ViewForm";

const DetailEmailPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { emailId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(emailId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="email.view" as={Link} to={makeUrl('/dashboard/setting/email', location)}/>
        <FormButton typical='edit' permission="email.update" as={Link} to={makeUrl(`/dashboard/setting/email/${emailId}/edit`, location)}/>
      </HStack>
      <ViewEmailForm />
    </Stack>
  )
}

export default DetailEmailPage;