import { actions } from "components/dashboard/setting/category/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment, useRef } from "react";
import EditCategoryForm from "components/dashboard/setting/category/forms/EditForm";
import MultiLanguageTabs from "modules/others/MultiLanguageTabs";

const EditCategoryPage = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const submitRef = useRef<any>(null);
  const { categoryId } = useParams();

  const submitHandler = (e: any) => {
    submitRef.current.click()
  }
  
  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(categoryId))
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="category.view" as={Link} to={makeUrl('/dashboard/setting/category', location)} />
        <FormButton typical='view' permission="category.view" as={Link} to={makeUrl(`/dashboard/setting/category/${categoryId}`, location)} />
        <FormButton typical='save' permission="category.update" onClick={submitHandler} />
      </HStack>
      <MultiLanguageTabs renderPanel={(lang: string) => <EditCategoryForm lang={lang} submitRef={submitRef}/>} />
    </Fragment>
  )
}

export default EditCategoryPage;