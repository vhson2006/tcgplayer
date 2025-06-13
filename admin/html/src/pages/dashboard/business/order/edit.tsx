import { actions } from "components/dashboard/business/order/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditOrderForm from "components/dashboard/business/order/forms/EditForm";

const EditOrderPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { orderId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(orderId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="order.view" as={Link} to={makeUrl('/dashboard/business/order', location)} />
        <FormButton typical='view' permission="order.view" as={Link} to={makeUrl(`/dashboard/business/order/${orderId}`, location)} />
        <FormButton typical='save' permission="order.update" onClick={submitHandler} />
      </HStack>
      <EditOrderForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditOrderPage;