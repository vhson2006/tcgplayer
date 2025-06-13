import { actions } from "components/dashboard/customer/customer/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditCustomerForm from "components/dashboard/customer/customer/forms/EditForm";

const EditCustomerPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { customerId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(customerId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="customer.view" as={Link} to={makeUrl('/dashboard/customer', location)} />
        <FormButton typical='view' permission="customer.view" as={Link} to={makeUrl(`/dashboard/customer/${customerId}`, location)} />
        <FormButton typical='save' permission="customer.update" onClick={submitHandler} />
      </HStack>
      <EditCustomerForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditCustomerPage;