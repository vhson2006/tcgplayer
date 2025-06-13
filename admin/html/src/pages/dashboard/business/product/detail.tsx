import { actions } from "components/dashboard/business/product/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewProductForm from "components/dashboard/business/product/forms/ViewForm";

const DetailProductPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { productSlug } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(productSlug))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="product.view" as={Link} to={makeUrl('/dashboard/business', location)}/>
        <FormButton typical='edit' permission="product.update" as={Link} to={makeUrl(`/dashboard/business/${productSlug}/edit`, location)}/>
      </HStack>
      <ViewProductForm />
    </Stack>
  )
}

export default DetailProductPage;