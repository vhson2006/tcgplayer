import { actions } from "components/dashboard/setting/tag/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";
import ViewTagForm from "components/dashboard/setting/tag/forms/ViewForm";

const DetailTagPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { tagId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(tagId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="tag.view" as={Link} to={makeUrl('/dashboard/setting', location)}/>
        <FormButton typical='edit' permission="tag.update" as={Link} to={makeUrl(`/dashboard/setting/${tagId}/edit`, location)}/>
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <ViewTagForm lang={lang} />}/>
    </Stack>
  )
}

export default DetailTagPage;