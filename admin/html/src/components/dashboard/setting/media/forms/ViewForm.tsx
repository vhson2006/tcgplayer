import { useEffect } from "react";
import { Stack, StackDivider, CardBody, Card, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";

const ViewMediaForm = (props: any) => {
  const form = defaultForm(useForm);
  const { detail } = useSelector((state: any) => state.mediaReducer); 

  useEffect(() => {
    form.setValue('name', detail.name)
    form.setValue('fileType', detail.fileType)
    form.setValue('alt', detail.alt)
  }, [detail.name, detail.fileType, detail.alt]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='media-name' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='media-alt'  isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='media-type' isDisabled={true} bg={'gray.100'}/>
          <Image boxSize='200px' src={detail?.url} alt={detail?.alt} />
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewMediaForm;