import { Stack, VisuallyHidden, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { useState } from "react";
import { actions } from "commons/modals/slice";
import { useDispatch, useSelector } from "react-redux";
import { actions as commentActions } from 'components/dashboard/setting/comment/slice';
import ChangeStatusSelect from "components/dashboard/setting/comment/inputs/ChangeStatusSelect";
import { MASS_CHANGE_COMMENT_MODAL } from "components/dashboard/setting/comment/popups/ChangeCommentModal";

const MassChangeCommentForm = (props: any) => {
  const [ commentStatus, handleSetCommentStatus ] = useState<any>();
  const { selected } = useSelector((state: any) => state.commentReducer)
  const { buttonRef } = props;
  const dispatch = useDispatch();
  const form = defaultForm(useForm);

  const massChangeCommentHandler = (data: any) => {
    dispatch(commentActions.MASS_CHANGE_ASYNC({selected, status: commentStatus}));
    dispatch(actions.CLOSE_MODAL(MASS_CHANGE_COMMENT_MODAL));
  }

  return (
    <form onSubmit={form.handleSubmit(massChangeCommentHandler)}>
      <Stack spacing={5}>
        <ChangeStatusSelect value={commentStatus} onChange={(value: any) => handleSetCommentStatus(value)}/>
        <VisuallyHidden>
          <Button ref={buttonRef} type='submit'/>
        </VisuallyHidden>
      </Stack>
    </form>
  )
}

export default MassChangeCommentForm