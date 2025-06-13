import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import TextAreaInput from "modules/forms/TextAreaInput";
import TextInput from "modules/forms/TextInput";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LeftView = (props: any) => {
  const { form, isDisabled } = props;
  const { detail } = useSelector((state: any) => state.employeesReducer); 

  useEffect(() => {
    form.setValue('name', detail?.name)
    form.setValue('cmnd', detail?.identified)
    form.setValue('phone', detail?.phone)
    form.setValue('email', detail?.email)
    form.setValue('address', detail.address)
  }, [detail?.name, detail?.identified, detail?.phone, detail?.email, detail?.address]);

  return (
    <Card w='50%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='name' isDisabled={isDisabled} bg={!isDisabled ? 'white' : 'gray.100'}/>
          <TextInput {...form} typical='cmnd'  isDisabled={isDisabled} bg={!isDisabled ? 'white' : 'gray.100'}/>
          <TextInput {...form} typical='phone' isDisabled={isDisabled} bg={!isDisabled ? 'white' : 'gray.100'}/>
          <TextInput {...form} typical='email' isDisabled={isDisabled} bg={!isDisabled ? 'white' : 'gray.100'}/>
          <TextAreaInput {...form} typical='address' isDisabled={isDisabled} bg={!isDisabled ? 'white' : 'gray.100'}/>
        </Stack>  
      </CardBody>
    </Card>
  )
}

export default LeftView;