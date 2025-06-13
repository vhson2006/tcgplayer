import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TagGroupSelect from "components/dashboard/setting/tag/inputs/TagGroupSelect";
import TextInput from "modules/forms/TextInput";
import { jsonParse } from "utils/json";

const ViewTagForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ tagGroup, setTagGroup ] = useState<any>();
  const { lang } = props;
  const { detail } = useSelector((state: any) => state.tagReducer); 
  const { type, typeName, group } = detail;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

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
      setTagGroup({ value: group.type, label: jsonParse(group.typeName)[activedLanguage]})
    }
  }, [activedLanguage, group]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='tag-type' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='tag-name' isDisabled={true} bg={'gray.100'}/>
          <TagGroupSelect isDisabled={true} value={tagGroup} onChange={(value: any) => setTagGroup(value)}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewTagForm;