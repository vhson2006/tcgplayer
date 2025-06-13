import { actions } from "components/dashboard/business/product/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditProductForm from "components/dashboard/business/product/forms/EditForm";

const EditProductPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { productSlug } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(productSlug))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="product.view" as={Link} to={makeUrl('/dashboard/business', location)} />
        <FormButton typical='view' permission="product.view" as={Link} to={makeUrl(`/dashboard/business/${productSlug}`, location)} />
        <FormButton typical='save' permission="product.update" onClick={submitHandler} />
      </HStack>
      <EditProductForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditProductPage;