import { Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createQuery, usePath } from "utils/link";
import { defaultForm } from "utils/form";
import { useLocation, useNavigate } from "react-router-dom";
import FloatTextInput from "modules/forms/FloatTextInput";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "commons/modals/slice";
import { FormButton } from "modules/buttons/FormButton";
import { MASS_CHANGE_COMMENT_MODAL } from "components/dashboard/setting/comment/popups/ChangeCommentModal";

export const SearchCommentForm = (props: any) => {
  const { params } = usePath();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const defaultFilter = {...{ search: null }, ...params};
  const form = defaultForm(useForm);
  const { selected } = useSelector((state: any) => state.commentReducer)

  useEffect(() => {
    form.setValue('search', defaultFilter.search);
  }, []);

  const searchNews = (data: any) => {
    navigate(`${location.pathname}?${createQuery({ ...params, ...data })}`);
  }
  
  const massChangeHandler = () => {
    dispatch(actions.OPEN_MODAL({ type: MASS_CHANGE_COMMENT_MODAL }));
  }

  return (
    <form onSubmit={form?.handleSubmit(searchNews)}>
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
        <Stack maxW={'sm'} >
          <FloatTextInput {...form} typical='search' />
        </Stack>
       
        {/* <FormButton 
          typical="massChange"
          isDisabled={!(Array.isArray(selected) && selected.length > 0)}
          onClick={massChangeHandler}
        /> */}
        <FormButton type="submit" permission="comment.view" typical="search"/>
      </Stack>
    </form>
  )
}

export default SearchCommentForm