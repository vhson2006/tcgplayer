import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as categoryActions } from "components/dashboard/setting/category/slice";
import CategoryGroupSelect from "components/dashboard/setting/category/inputs/CategoryGroupSelect";
import TextInput from "modules/forms/TextInput";
import { jsonParse } from "utils/json";

const EditCategoryForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ categoryGroup, setCategoryGroup ] = useState<any>();
  const { lang, submitRef } = props;
  const { detail } = useSelector((state: any) => state.categoryReducer); 
  const { type, typeName, group } = detail;

  useEffect(() => {
    if (typeName) {
      form.setValue('name', jsonParse(typeName)[lang])
    }
  }, [lang, typeName]);

  useEffect(() => {
    form.setValue('type', type)
  }, [type]);

  useEffect(() => {
    if (group) {
      setCategoryGroup({ value: group.type, label: jsonParse(group.typeName)[lang]})
    }
  }, [lang, group]);

  const editCategoryHandler = (data: any) => {
    const editParams = {
      ...data,
      group: categoryGroup.value,
      lang,
      id: detail.id,
    };
    dispatch(categoryActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editCategoryHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='category-type' />
            <TextInput {...form} typical='category-name' />
            <CategoryGroupSelect value={categoryGroup} onChange={(value: any) => setCategoryGroup(value)}/>
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditCategoryForm;