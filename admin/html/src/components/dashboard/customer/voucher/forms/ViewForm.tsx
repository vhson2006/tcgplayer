import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import ConditionType from "components/dashboard/customer/voucher/inputs/ConditionType";
import VoucherType from "components/dashboard/customer/voucher/inputs/VoucherType";
import { jsonParse } from "utils/json";

const ViewVoucherForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ conditionType, setConditionType ] = useState<any>();
  const [ voucherType, setVoucherType ] = useState<any>();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { detail } = useSelector((state: any) => state.voucherReducer); 

  useEffect(() => {
    form.setValue('code', detail?.code);
    form.setValue('value', detail?.value);
    form.setValue('min', detail?.min);
    form.setValue('max', detail?.max);
    form.setValue('conditionValue', detail?.conditionValue);
    setVoucherType({ value: detail?.type?.type, label: jsonParse(detail?.type?.typeName)[activedLanguage] });
    setConditionType({ value: detail?.conditionType?.type, label: jsonParse(detail?.conditionType?.typeName)[activedLanguage] });
  }, [ detail.code, detail.value, detail.min, detail.max, detail.conditionValue, detail.type?.id, detail.conditionType?.id ]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='voucher-code' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='voucher-value' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='voucher-min' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='voucher-max' isDisabled={true} bg={'gray.100'}/>
          <VoucherType value={voucherType} onChange={setVoucherType} isDisabled={true}/>
          <ConditionType value={conditionType} onChange={setConditionType} isDisabled={true}/>
          <TextInput {...form} typical='condition-value' isDisabled={true} bg={'gray.100'}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewVoucherForm;