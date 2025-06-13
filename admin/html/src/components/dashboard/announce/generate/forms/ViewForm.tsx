import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import GenerateStatus from "components/dashboard/announce/generate/inputs/GenerateStatus";
import { jsonParse } from "utils/json";

const ViewGenerateForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ generateStatus, setGenerateStatus ] = useState<any>();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { detail } = useSelector((state: any) => state.generateReducer); 

  useEffect(() => {
    if (detail.command) {
      form.setValue('command', detail.command)
    }
    setGenerateStatus({value: detail?.status?.type, label: jsonParse(detail?.status?.typeName)[activedLanguage]});
  }, [detail.command, detail.status]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='generate-command' isDisabled={true} bg={'gray.100'}/>
          <GenerateStatus isDisabled={true} value={generateStatus} onChange={setGenerateStatus} />
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewGenerateForm;