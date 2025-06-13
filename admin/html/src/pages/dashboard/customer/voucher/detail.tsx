import { actions } from "components/dashboard/customer/voucher/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack, Stack } from '@chakra-ui/react'
import { Link, useLocation, useParams } from "react-router-dom";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import ViewVoucherForm from "components/dashboard/customer/voucher/forms/ViewForm";

const DetailVoucherPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { voucherId } = useParams();
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(voucherId))
  }, []);
  
  return (
    <Stack>
      <HStack pb={5}>
        <FormButton typical='list' permission="voucher.view" as={Link} to={makeUrl('/dashboard/customer/voucher', location)}/>
        <FormButton typical='edit' permission="voucher.update" as={Link} to={makeUrl(`/dashboard/customer/voucher/${voucherId}/edit`, location)}/>
      </HStack>
      <ViewVoucherForm />
    </Stack>
  )
}

export default DetailVoucherPage;