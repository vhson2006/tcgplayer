import { useEffect } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as customerActions } from "components/dashboard/customer/customer/slice";
import TextInput from "modules/forms/TextInput";

const EditCustomerForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.customerReducer); 

  useEffect(() => {
    form.setValue('name', detail.name)
    form.setValue('phone', detail.phone)
    form.setValue('address', detail.address)
  }, [detail.name, detail.phone, detail.address]);

  const editCustomerHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
    };
    dispatch(customerActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editCustomerHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='name' />
            <TextInput {...form} typical='phone' />
            <TextInput {...form} typical='address' />

            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditCustomerForm;