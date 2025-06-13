import { Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createQuery, usePath } from "utils/link";
import { defaultForm } from "utils/form";
import { useLocation, useNavigate } from "react-router-dom";
import FloatTextInput from "modules/forms/FloatTextInput";
import { useDispatch } from "react-redux";
import { actions } from "commons/drawers/slice";
import { ADD_ROLE_DRAWER } from "components/dashboard/organisation/role/popups/AddDrawer";
import { FormButton } from "modules/buttons/FormButton";

export const SearchRoleForm = (props: any) => {
  const { params } = usePath();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const defaultFilter = {...{ search: null }, ...params};
  const form = defaultForm(useForm);
  
  useEffect(() => {
    form.setValue('search', defaultFilter.search);
  }, []);

  const searchRole = (data: any) => {
    console.log(params)
    console.log(`${location.pathname}?${createQuery({ ...params, ...data })}`)

    navigate(`${location.pathname}?${createQuery({ ...params, ...data })}`);
  }
  
  const addRoleHandler = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_ROLE_DRAWER, size: 'xl', data: {} }));
  }

  return (
    <form onSubmit={form?.handleSubmit(searchRole)}>
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
        <Stack maxW={'sm'} >
          <FloatTextInput {...form} typical='search' />
        </Stack>
        <FormButton typical="add" permission="role.create" onClick={addRoleHandler} />
        <FormButton type="submit" permission="role.view" typical="search"/>
      </Stack>
    </form>
  )
}

export default SearchRoleForm