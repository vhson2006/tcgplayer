import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as emailActions } from "components/dashboard/setting/email/slice";
import TextInput from "modules/forms/TextInput";
import EmailType from "components/dashboard/setting/email/inputs/EmailType";
import { jsonParse } from "utils/json";

const EditEmailForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ emailType, setEmailType ] = useState<any>();
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.emailReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    if (detail.title) {
      form.setValue('title', detail.title)
    }
    if (detail.content) {
      form.setValue('content', detail.content)
    }
    setEmailType({value: detail?.type?.type, label: jsonParse(detail?.type?.typeName)[activedLanguage]})
  }, [detail.title, detail.content, detail.type]);

  const editEmailHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
      type: emailType?.value,
    };
    dispatch(emailActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editEmailHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='email-title' />
            <TextInput {...form} typical='email-content' />
            <EmailType value={emailType} onChange={setEmailType} />

            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditEmailForm;