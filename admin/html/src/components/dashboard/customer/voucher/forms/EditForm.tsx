import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import { actions as voucherActions } from "components/dashboard/customer/voucher/slice";
import ConditionType from "components/dashboard/customer/voucher/inputs/ConditionType";
import VoucherType from "components/dashboard/customer/voucher/inputs/VoucherType";
import { jsonParse } from "utils/json";

const EditVoucherForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ conditionType, setConditionType ] = useState<any>();
  const [ voucherType, setVoucherType ] = useState<any>();
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.voucherReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    form.setValue('code', detail?.code);
    form.setValue('value', detail?.value);
    form.setValue('min', detail?.min);
    form.setValue('max', detail?.max);
    form.setValue('conditionValue', detail?.conditionValue);
    setVoucherType({ value: detail?.type?.type, label: jsonParse(detail?.type?.typeName)[activedLanguage] });
    setConditionType({ value: detail?.conditionType?.type, label: jsonParse(detail?.conditionType?.typeName)[activedLanguage] });
  }, [ detail.code, detail.value, detail.min, detail.max, detail.conditionValue, detail.type?.id, detail.conditionType?.id ]);

  const editVoucherHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
      type: voucherType?.value,
      conditionType: conditionType?.value,
    };
    dispatch(voucherActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editVoucherHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='voucher-code' />
            <TextInput {...form} typical='voucher-value' />
            <TextInput {...form} typical='voucher-min' />
            <TextInput {...form} typical='voucher-max' />
            <VoucherType value={voucherType} onChange={setVoucherType} />
            <ConditionType value={conditionType} onChange={setConditionType} />
            <TextInput {...form} typical='condition-value' />
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditVoucherForm;