import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import CategoryGroupSelect from "components/dashboard/setting/category/inputs/CategoryGroupSelect";
import TextInput from "modules/forms/TextInput";
import { jsonParse } from "utils/json";

const ViewCategoryForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ categoryGroup, setCategoryGroup ] = useState<any>();
  const { lang } = props;
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

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='category-type' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='category-name' isDisabled={true} bg={'gray.100'}/>
          <CategoryGroupSelect isDisabled={true} value={categoryGroup} onChange={(value: any) => setCategoryGroup(value)}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewCategoryForm;