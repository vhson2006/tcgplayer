import { actions } from "components/dashboard/setting/access-code/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewAccessCodeForm from "components/dashboard/setting/access-code/forms/ViewForm";

const DetailAccessCodePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { accessCodeId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(accessCodeId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="accesscode.view" as={Link} to={makeUrl('/dashboard/setting/access-code', location)}/>
        <FormButton typical='edit' permission="accesscode.update" as={Link} to={makeUrl(`/dashboard/setting/access-code/${accessCodeId}/edit`, location)}/>
      </HStack>
      <ViewAccessCodeForm />
    </Stack>
  )
}

export default DetailAccessCodePage;