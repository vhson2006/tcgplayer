import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import { actions as voucherActions } from "components/dashboard/customer/voucher/slice";
import ConditionType from "components/dashboard/customer/voucher/inputs/ConditionType";
import VoucherType from "components/dashboard/customer/voucher/inputs/VoucherType";
import { usePath } from "utils/link";

const AddVoucherForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ conditionType, setConditionType ] = useState<any>();
  const [ voucherType, setVoucherType ] = useState<any>();
  const { submitRef } = props;
  const { params } = usePath();

  const addVoucherHandler = (data: any) => {
    const addParams = {
      ...data,
      type: voucherType?.value,
      conditionType: conditionType?.value,
      params
    };
    dispatch(voucherActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addVoucherHandler)}>
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
    </form>
  )
}

export default AddVoucherForm;