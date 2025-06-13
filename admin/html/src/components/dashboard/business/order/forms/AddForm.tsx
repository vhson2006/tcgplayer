import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as orderActions } from "components/dashboard/business/order/slice";
import TextInput from "modules/forms/TextInput";
import PaymentType from "components/dashboard/business/order/inputs/PaymentType";
import OrderStatus from "components/dashboard/business/order/inputs/OrderStatus";
import PaymentStatus from "components/dashboard/business/order/inputs/PaymentStatus";
import { usePath } from "utils/link";

const AddOrderForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ orderStatus, setOrderStatus ] = useState<any>();
  const [ paymentType, setPaymentType ] = useState<any>();
  const [ paymentStatus, setPaymentStatus ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addOrderHandler = (data: any) => {
    const addParams = {
      ...data,
      status: orderStatus?.value,
      paymentType: paymentType?.value,
      paymentStatus: paymentStatus?.value,
      params
    };
    dispatch(orderActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addOrderHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        {/* <TextInput {...form} typical='order-serial' /> */}
        <TextInput {...form} typical='order-phone' />
        <TextInput {...form} typical='order-address' />
        <OrderStatus value={orderStatus} onChange={setOrderStatus} />
        <PaymentType value={paymentType} onChange={setPaymentType} />
        <PaymentStatus value={paymentStatus} onChange={setPaymentStatus} />
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddOrderForm;