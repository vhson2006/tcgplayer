import { actions } from "components/dashboard/setting/media/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditMediaForm from "components/dashboard/setting/media/forms/EditForm";

const EditMediaPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { mediaId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(mediaId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="media.view" as={Link} to={makeUrl('/dashboard/setting/media', location)} />
        <FormButton typical='view' permission="media.view" as={Link} to={makeUrl(`/dashboard/setting/media/${mediaId}`, location)} />
        <FormButton typical='save' permission="media.update" onClick={submitHandler} />
      </HStack>
      <EditMediaForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default EditMediaPage;