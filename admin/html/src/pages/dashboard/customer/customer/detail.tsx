import { actions } from "components/dashboard/customer/customer/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewCustomerForm from "components/dashboard/customer/customer/forms/ViewForm";

const DetailCustomerPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { customerId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(customerId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="customer.view" as={Link} to={makeUrl('/dashboard/customer', location)}/>
        <FormButton typical='edit' permission="customer.update" as={Link} to={makeUrl(`/dashboard/customer/${customerId}/edit`, location)}/>
      </HStack>
      <ViewCustomerForm />
    </Stack>
  )
}

export default DetailCustomerPage;