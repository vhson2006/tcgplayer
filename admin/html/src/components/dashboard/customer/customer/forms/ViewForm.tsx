import { useEffect } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";

const ViewCustomerForm = (props: any) => {
  const form = defaultForm(useForm);
  const { detail } = useSelector((state: any) => state.customerReducer); 

  useEffect(() => {
    form.setValue('name', detail.name)
    form.setValue('phone', detail.phone)
    form.setValue('address', detail.address)
  }, [detail.name, detail.phone, detail.address]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='name' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='phone' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='address' isDisabled={true} bg={'gray.100'}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewCustomerForm;