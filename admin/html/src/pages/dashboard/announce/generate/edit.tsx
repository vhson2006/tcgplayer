import { actions } from "components/dashboard/announce/generate/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditGenerateForm from "components/dashboard/announce/generate/forms/EditForm";

const EditGeneratePage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { generateId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(generateId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="generate.view" as={Link} to={makeUrl('/dashboard/announce/generate', location)} />
        <FormButton typical='view' permission="generate.view" as={Link} to={makeUrl(`/dashboard/announce/generate/${generateId}`, location)} />
        <FormButton typical='save' permission="generate.update" onClick={submitHandler} />
      </HStack>
      <EditGenerateForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditGeneratePage;