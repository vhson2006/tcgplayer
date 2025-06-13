import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as orderActions } from "components/dashboard/business/order/slice";
import TextInput from "modules/forms/TextInput";
import PaymentType from "components/dashboard/business/order/inputs/PaymentType";
import OrderStatus from "components/dashboard/business/order/inputs/OrderStatus";
import PaymentStatus from "components/dashboard/business/order/inputs/PaymentStatus";
import { jsonParse } from "utils/json";

const EditOrderForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ orderStatus, setOrderStatus ] = useState<any>();
  const [ paymentType, setPaymentType ] = useState<any>();
  const [ paymentStatus, setPaymentStatus ] = useState<any>();
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.orderReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    form.setValue('serial', detail?.serial);
    form.setValue('phone', detail?.phone);
    form.setValue('address', detail?.address);
    setOrderStatus({ value: detail?.status?.type, label:jsonParse( detail?.status?.typeName)[activedLanguage] });
    setPaymentType({ value: detail?.paymentType?.type, label: jsonParse(detail?.paymentType?.typeName)[activedLanguage] });
    setPaymentStatus({ value: detail?.paymentStatus?.type, label: jsonParse(detail?.paymentStatus?.typeName)[activedLanguage] });
  }, [ detail.serial, detail.phone, detail.address, detail.paymentType, detail.paymentStatus ]);

  const editOrderHandler = (data: any) => {
    const { serial, ...others } = data
    const editParams = {
      ...others,
      id: detail.id,
      status: orderStatus?.value,
      paymentType: paymentType?.value,
      paymentStatus: paymentStatus?.value,
    };
    dispatch(orderActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editOrderHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='order-serial' isDisabled={true} bg={'gray.100'}/>
            <TextInput {...form} typical='order-phone' />
            <TextInput {...form} typical='order-address' />
            <OrderStatus value={orderStatus} onChange={setOrderStatus} />
            <PaymentType value={paymentType} onChange={setPaymentType} />
            <PaymentStatus value={paymentStatus} onChange={setPaymentStatus} />
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditOrderForm;