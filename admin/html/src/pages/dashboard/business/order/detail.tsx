import { actions } from "components/dashboard/business/order/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewOrderForm from "components/dashboard/business/order/forms/ViewForm";

const DetailOrderPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { orderId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(orderId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="order.view" as={Link} to={makeUrl('/dashboard/business/order', location)}/>
        <FormButton typical='edit' permission="order.update" as={Link} to={makeUrl(`/dashboard/business/order/${orderId}/edit`, location)}/>
      </HStack>
      <ViewOrderForm />
    </Stack>
  )
}

export default DetailOrderPage;