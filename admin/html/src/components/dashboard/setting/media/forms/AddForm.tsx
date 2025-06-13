import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as mediaActions } from "components/dashboard/setting/media/slice";
import TextInput from "modules/forms/TextInput";
import Dropzone from "modules/forms/Dropzone"
import { useState } from "react";
import { usePath } from "utils/link";

const AddMediaForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const { submitRef } = props;
  const { params } = usePath();


  const addMediaHandler = (data: any) => {
    const addParams = {
      ...data,
      file: uploadedFiles[0]?.id,
      params
    };
    dispatch(mediaActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addMediaHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='media-name' />
        <TextInput {...form} typical='media-alt' />
        <Dropzone mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>

        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddMediaForm;