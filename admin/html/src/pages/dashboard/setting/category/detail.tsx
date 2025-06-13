import { actions } from "components/dashboard/setting/category/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";
import ViewCategoryForm from "components/dashboard/setting/category/forms/ViewForm";

const DetailCategoryPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { categoryId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(categoryId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="category.view" as={Link} to={makeUrl('/dashboard/setting/category', location)}/>
        <FormButton typical='edit' permission="category.update" as={Link} to={makeUrl(`/dashboard/setting/category/${categoryId}/edit`, location)}/>
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <ViewCategoryForm lang={lang} />}/>
    </Stack>
  )
}

export default DetailCategoryPage;