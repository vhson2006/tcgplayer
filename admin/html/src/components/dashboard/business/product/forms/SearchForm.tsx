import { Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createQuery, usePath } from "utils/link";
import { defaultForm } from "utils/form";
import { useLocation, useNavigate } from "react-router-dom";
import FloatTextInput from "modules/forms/FloatTextInput";
import { useDispatch } from "react-redux";
import { actions } from "commons/drawers/slice";
import { ADD_PRODUCT_DRAWER } from "components/dashboard/business/product/popups/AddDrawer";
import { FormButton } from "modules/buttons/FormButton";
import { common, supportFileUpload } from "commons/config";
import { t } from "commons/languages/helper";
import notify from "utils/notify";
import FileUpload from "modules/forms/FileUpload";
import { uploadCSV } from "utils/api";
import { actions as productActions } from 'components/dashboard/business/product/slice';

export const SearchProductForm = (props: any) => {
  const { params } = usePath();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const defaultFilter = {...{ search: null }, ...params};
  const form = defaultForm(useForm);

  useEffect(() => {
    form.setValue('search', defaultFilter.search);
  }, []);

  const searchNews = (data: any) => {
    navigate(`${location.pathname}?${createQuery({ ...params, ...data })}`);
  }
  
  const addNewsHandler = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_PRODUCT_DRAWER, size: 'xl', data: {} }));
  }

  const uploadHandler = async (event: any) => {
    event.preventDefault();
    if (event.target.files) {
      const { size, type } = event.target.files[0]
      if (size > 10000000) {
        notify.error(t('error.filesize'))
      }
      if (supportFileUpload.includes(type) === false) {
        notify.error(t('error.filetype'))
      }
      if (size <= 10000000 && supportFileUpload.includes(type)) {
        const response = await uploadCSV(event.target.files);
        if (response.status === common.INCORRECT) {
          notify.error(t('message.error'))
        } else {
        }
        event.target.value = null
      }
      dispatch(productActions.GET_LIST_ASYNC(params));
      notify.success(t('message.success'))
    } else {
      console.log(event.target.files)
    }
  }

  
  return (
    <form onSubmit={form?.handleSubmit(searchNews)}>
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
        <Stack maxW={'sm'} >
          <FloatTextInput {...form} typical='search' />
        </Stack>
        <FormButton typical="add" permission="product.create" onClick={addNewsHandler} />
          <FileUpload  permission="product.create" onChange={uploadHandler} />
        <FormButton type="submit" permission="product.view" typical="search"/>
      </Stack>
    </form>
  )
}

export default SearchProductForm