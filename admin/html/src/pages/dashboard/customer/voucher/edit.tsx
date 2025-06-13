import { actions } from "components/dashboard/customer/voucher/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditVoucherForm from "components/dashboard/customer/voucher/forms/EditForm";

const EditVoucherPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { voucherId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(voucherId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="voucher.view" as={Link} to={makeUrl('/dashboard/customer/voucher', location)} />
        <FormButton typical='view' permission="voucher.view" as={Link} to={makeUrl(`/dashboard/customer/voucher/${voucherId}`, location)} />
        <FormButton typical='save' permission="voucher.update" onClick={submitHandler} />
      </HStack>
      <EditVoucherForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditVoucherPage;