import { actions } from "components/dashboard/announce/news/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditNewsForm from "components/dashboard/announce/news/forms/EditForm";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";

const EditlNewsPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { newsSlug } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click()
  }
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_BY_SLUG_ASYNC(newsSlug))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="news.view" as={Link} to={makeUrl('/dashboard/announce', location)} />
        <FormButton typical='view' permission="news.view" as={Link} to={makeUrl(`/dashboard/announce/${newsSlug}`, location)} />
        <FormButton typical='save' permission="news.update" onClick={submitHandler} />
      </HStack>
      <MultiLanguageTabs 
        renderPanel={(lang: string) => <EditNewsForm lang={lang} submitRef={submitRef}/>}
      />
    </Fragment>
  )
}

export default EditlNewsPage;