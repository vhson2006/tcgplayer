import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as generateActions } from "components/dashboard/announce/generate/slice";
import TextInput from "modules/forms/TextInput";
import GenerateStatus from "components/dashboard/announce/generate/inputs/GenerateStatus";
import { useState } from "react";
import { usePath } from "utils/link";

const AddGenerateForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ generateStatus, setGenerateStatus ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addGenerateHandler = (data: any) => {
    const addParams = {
      ...data,
      status: generateStatus?.value,
      params
    };
    dispatch(generateActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addGenerateHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='generate-command' />
        <GenerateStatus value={generateStatus} onChange={setGenerateStatus} />
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddGenerateForm;