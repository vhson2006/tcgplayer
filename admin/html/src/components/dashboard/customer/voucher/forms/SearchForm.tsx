import { Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createQuery, usePath } from "utils/link";
import { defaultForm } from "utils/form";
import { useLocation, useNavigate } from "react-router-dom";
import FloatTextInput from "modules/forms/FloatTextInput";
import { useDispatch } from "react-redux";
import { actions } from "commons/drawers/slice";
import { ADD_VOUCHER_DRAWER } from "components/dashboard/customer/voucher/popups/AddDrawer";
import { FormButton } from "modules/buttons/FormButton";

export const SearchVoucherForm = (props: any) => {
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
    dispatch(actions.OPEN_DRAWER({ type: ADD_VOUCHER_DRAWER, size: 'xl', data: {} }));
  }

  return (
    <form onSubmit={form?.handleSubmit(searchNews)}>
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
        <Stack maxW={'sm'} >
          <FloatTextInput {...form} typical='search' />
        </Stack>
        <FormButton typical="add" permission="voucher.create" onClick={addNewsHandler} />
        <FormButton type="submit" permission="voucher.view" typical="search"/>
      </Stack>
    </form>
  )
}

export default SearchVoucherForm