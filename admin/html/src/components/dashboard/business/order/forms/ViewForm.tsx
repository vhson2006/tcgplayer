import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import PaymentType from "components/dashboard/business/order/inputs/PaymentType";
import OrderStatus from "components/dashboard/business/order/inputs/OrderStatus";
import PaymentStatus from "components/dashboard/business/order/inputs/PaymentStatus";
import { jsonParse } from "utils/json";

const ViewOrderForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ orderStatus, setOrderStatus ] = useState<any>();
  const [ paymentType, setPaymentType ] = useState<any>();
  const [ paymentStatus, setPaymentStatus ] = useState<any>();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { detail } = useSelector((state: any) => state.orderReducer); 

  useEffect(() => {
    form.setValue('serial', detail?.serial);
    form.setValue('phone', detail?.phone);
    form.setValue('address', detail?.address);
    setOrderStatus({ value: detail?.status?.type, label: jsonParse(detail?.status?.typeName)[activedLanguage] });
    setPaymentType({ value: detail?.paymentType?.type, label: jsonParse(detail?.paymentType?.typeName)[activedLanguage] });
    setPaymentStatus({ value: detail?.paymentStatus?.type, label: jsonParse(detail?.paymentStatus?.typeName)[activedLanguage] });
  }, [ detail.serial, detail.phone, detail.address, detail.paymentType, detail.paymentStatus ]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} isDisabled={true} typical='order-serial' bg={'gray.100'} />
          <TextInput {...form} isDisabled={true} typical='order-phone' bg={'gray.100'} />
          <TextInput {...form} isDisabled={true} typical='order-address' bg={'gray.100'} />
          <OrderStatus value={orderStatus} onChange={setOrderStatus} isDisabled={true}/>
          <PaymentType value={paymentType} onChange={setPaymentType} isDisabled={true}/>
          <PaymentStatus value={paymentStatus} onChange={setPaymentStatus} isDisabled={true}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewOrderForm;