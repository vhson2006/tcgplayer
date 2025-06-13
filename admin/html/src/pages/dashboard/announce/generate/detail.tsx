import { actions } from "components/dashboard/announce/generate/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewGenerateForm from "components/dashboard/announce/generate/forms/ViewForm";

const DetailGeneratePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { generateId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(generateId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="generate.view" as={Link} to={makeUrl('/dashboard/announce/generate', location)}/>
        <FormButton typical='edit' permission="generate.update" as={Link} to={makeUrl(`/dashboard/announce/generate/${generateId}/edit`, location)}/>
      </HStack>
      <ViewGenerateForm />
    </Stack>
  )
}

export default DetailGeneratePage;