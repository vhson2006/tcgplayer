import { Stack, Button, StackDivider, VisuallyHidden, FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as customerActions } from "components/dashboard/customer/customer/slice";
import TextInput from "modules/forms/TextInput";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { usePath } from "utils/link";

const AddCustomerForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ customerType, setCustomerType ] = useState();
  const { submitRef } = props;
  const { params } = usePath();

  const addCustomerHandler = (data: any) => {
    const addParams = {
      ...data,
      params
    };
    dispatch(customerActions.ADD_ASYNC(addParams));
  }
  const [value, setValue] = useState<any>()

  return (
    <form onSubmit={form.handleSubmit(addCustomerHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='name' />
        <TextInput {...form} typical='phone' />
        <TextInput {...form} typical='address' />
        {/* <FormControl>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '1.5', md: '8' }}
            justify="space-between"
          >
            <FormLabel minW={150} variant="inline">dddd</FormLabel>
            <PhoneInput
              // containerClass="my-container-class chakra-input"
              // containerStyle={{
              //   border: "10px solid red"
              // }}
              // inputStyle={{
              //   background: "lightblue"
              // }}
              inputClass="chakra-input"
              placeholder="Enter phone number"
              value={value}
              onChange={(e) =>setValue(e)}
              />
          </Stack>
        </FormControl> */}
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddCustomerForm;