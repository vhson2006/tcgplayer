import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as accessCodeActions } from "components/dashboard/setting/access-code/slice";
import AccessCodeType from "components/dashboard/setting/access-code/inputs/AccessCodeType";
import { useState } from "react";
import AccessCodeStatus from "components/dashboard/setting/access-code/inputs/AccessCodeStatus";
import DurationInput from "components/dashboard/setting/access-code/inputs/Duration";
import SliderInput from "components/dashboard/setting/access-code/inputs/SliderInput";
import { usePath } from "utils/link";

const AddAccessCodeForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ accessCodeType, setAccessCodeType ] = useState<any>();
  const [ accessCodeStatus, setAccessCodeStatus ] = useState<any>();
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const [ accessCodeTimes, setAccessCodeTimes ] = useState<any>(1);
  const { submitRef } = props;
  const { params } = usePath();

  const addAccessCodeHandler = (data: any) => {
    const addParams = {
      ...data,
      type: accessCodeType?.value,
      status: accessCodeStatus?.value,
      times: accessCodeTimes,
      selectedDates,
      params
    };
    dispatch(accessCodeActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addAccessCodeHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <SliderInput value={accessCodeTimes} onChange={setAccessCodeTimes}/>
        <DurationInput value={selectedDates} onChange={setSelectedDates}/>
        <AccessCodeStatus value={accessCodeStatus} onChange={setAccessCodeStatus} />
        <AccessCodeType value={accessCodeType} onChange={setAccessCodeType} />
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddAccessCodeForm;