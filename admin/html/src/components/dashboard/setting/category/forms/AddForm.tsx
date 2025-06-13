import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as categoryActions } from "components/dashboard/setting/category/slice";
import CategoryGroupSelect from "components/dashboard/setting/category/inputs/CategoryGroupSelect";
import TextInput from "modules/forms/TextInput";
import { usePath } from "utils/link";

const AddCategoryForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ categoryGroup, setCategoryGroup ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addCategoryHandler = (data: any) => {
    const addParams = {
      ...data,
      group: categoryGroup.value,
      params
    };
    dispatch(categoryActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addCategoryHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='category-type' />
        <TextInput {...form} typical='category-name' />
        <CategoryGroupSelect value={categoryGroup} onChange={(value: any) => setCategoryGroup(value)}/>
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddCategoryForm;