import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as generateActions } from "components/dashboard/announce/generate/slice";
import TextInput from "modules/forms/TextInput";
import GenerateStatus from "components/dashboard/announce/generate/inputs/GenerateStatus";
import { jsonParse } from "utils/json";

const EditGenerateForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ generateStatus, setGenerateStatus ] = useState<any>();
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.generateReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    if (detail.command) {
      form.setValue('command', detail.command);
    }
    setGenerateStatus({value: detail?.status?.type, label: jsonParse(detail?.status?.typeName)[activedLanguage]});
  }, [detail.command, detail.status]);

  const editGenerateHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
      status: generateStatus?.value
    };
    dispatch(generateActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editGenerateHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='generate-command' />
            <GenerateStatus value={generateStatus} onChange={setGenerateStatus} />
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditGenerateForm;