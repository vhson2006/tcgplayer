import { useEffect } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as mediaActions } from "components/dashboard/setting/media/slice";
import TextInput from "modules/forms/TextInput";

const EditMediaForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.mediaReducer); 

  useEffect(() => {
    form.setValue('name', detail.name)
    form.setValue('fileType', detail.fileType)
    form.setValue('alt', detail.alt)
  }, [detail.name, detail.fileType, detail.alt]);

  const editMediaHandler = (data: any) => {
    const editParams = {
      ...data,
      
      id: detail.id,
    };
    dispatch(mediaActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editMediaHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='media-name' />
            <TextInput {...form} typical='media-alt' />
            <TextInput {...form} typical='media-type' />
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditMediaForm;