import { actions } from "components/dashboard/setting/tag/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditTagForm from "components/dashboard/setting/tag/forms/EditForm";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";

const EditTagPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { tagId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click()
  }
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(tagId))
  }, [tagId]);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="tag.view" as={Link} to={makeUrl('/dashboard/setting', location)} />
        <FormButton typical='view' permission="tag.view" as={Link} to={makeUrl(`/dashboard/setting/${tagId}`, location)} />
        <FormButton typical='save' permission="tag.update" onClick={submitHandler} />
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <EditTagForm lang={lang} submitRef={submitRef}/>} />
    </Fragment>
  )
}

export default EditTagPage;