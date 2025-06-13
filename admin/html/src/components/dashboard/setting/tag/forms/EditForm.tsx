import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as tagActions } from "components/dashboard/setting/tag/slice";
import TagGroupSelect from "components/dashboard/setting/tag/inputs/TagGroupSelect";
import TextInput from "modules/forms/TextInput";
import { jsonParse } from "utils/json";

const EditTagForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ tagGroup, setTagGroup ] = useState<any>();
  const { lang, submitRef } = props;
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

  const editTagHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
      group: tagGroup.value,
      lang,
    };
    dispatch(tagActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editTagHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='tag-type' />
            <TextInput {...form} typical='tag-name' />
            <TagGroupSelect value={tagGroup} onChange={(value: any) => setTagGroup(value)}/>
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditTagForm;