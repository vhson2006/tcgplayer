import { actions } from "components/dashboard/setting/media/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewMediaForm from "components/dashboard/setting/media/forms/ViewForm";

const DetailMediaPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { mediaId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(mediaId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="media.view" as={Link} to={makeUrl('/dashboard/setting/media', location)}/>
        <FormButton typical='edit' permission="media.update" as={Link} to={makeUrl(`/dashboard/setting/media/${mediaId}/edit`, location)}/>
      </HStack>
      <ViewMediaForm />
    </Stack>
  )
}

export default DetailMediaPage;