import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import EmailType from "components/dashboard/setting/email/inputs/EmailType";
import { jsonParse } from "utils/json";

const ViewEmailForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ emailType, setEmailType ] = useState<any>();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { detail } = useSelector((state: any) => state.emailReducer); 

  useEffect(() => {
    if (detail.title) {
      form.setValue('title', detail.title)
    }
    if (detail.content) {
      form.setValue('content', detail.content)
    }
    setEmailType({value: detail?.type?.type, label: jsonParse(detail?.type?.typeName)[activedLanguage]})

  }, [detail.title, detail.content]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='email-title' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='email-content' isDisabled={true} bg={'gray.100'}/>
          <EmailType value={emailType} onChange={setEmailType} isDisabled={true} />
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewEmailForm;