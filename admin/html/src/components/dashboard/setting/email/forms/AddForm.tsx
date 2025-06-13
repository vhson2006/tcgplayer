import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as emailActions } from "components/dashboard/setting/email/slice";
import TextInput from "modules/forms/TextInput";
import EmailType from "components/dashboard/setting/email/inputs/EmailType";
import { useState } from "react";
import { usePath } from "utils/link";

const AddEmailForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ emailType, setEmailType ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addEmailHandler = (data: any) => {
    const addParams = {
      ...data,
      type: emailType?.value,
      params
    };
    dispatch(emailActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addEmailHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='email-title' />
        <TextInput {...form} typical='email-content' />
        <EmailType value={emailType} onChange={setEmailType} />
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddEmailForm;