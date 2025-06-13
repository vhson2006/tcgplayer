import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as tagActions } from "components/dashboard/setting/tag/slice";
import TagGroupSelect from "components/dashboard/setting/tag/inputs/TagGroupSelect";
import TextInput from "modules/forms/TextInput";
import { usePath } from "utils/link";

const AddTagForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ tagGroup, setTagGroup ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addTagHandler = (data: any) => {
    const addParams = {
      ...data,
      group: tagGroup.value,
      params,
    };
    dispatch(tagActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addTagHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='tag-type' />
        <TextInput {...form} typical='tag-name' />
        <TagGroupSelect value={tagGroup} onChange={(value: any) => setTagGroup(value)}/>
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddTagForm;