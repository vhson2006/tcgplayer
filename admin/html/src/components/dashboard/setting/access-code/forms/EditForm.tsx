import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as accessCodeActions } from "components/dashboard/setting/access-code/slice";
import AccessCodeType from "components/dashboard/setting/access-code/inputs/AccessCodeType";
import AccessCodeStatus from "components/dashboard/setting/access-code/inputs/AccessCodeStatus";
import DurationInput from "components/dashboard/setting/access-code/inputs/Duration";
import SliderInput from "components/dashboard/setting/access-code/inputs/SliderInput";
import { jsonParse } from "utils/json";

const EditAccessCodeForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ accessCodeType, setAccessCodeType ] = useState<any>([]);
  const [ accessCodeStatus, setAccessCodeStatus ] = useState<any>([]);
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const [ accessCodeTimes, setAccessCodeTimes ] = useState<any>(1);
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.accessCodeReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    if (detail.times) {
      setAccessCodeTimes(detail.times);
    }
    if (detail.startTime &&  detail.endTime) {
      setSelectedDates([ detail.startTime,  detail.endTime]);
    }
    
    
    setAccessCodeStatus([{value: detail?.status?.type, label: jsonParse(detail?.status?.typeName)[activedLanguage] }]);
    setAccessCodeType([{value: detail?.type?.type, label: jsonParse(detail?.type?.typeName)[activedLanguage] }]);
  }, [detail.times, detail.startTime, detail.endTime]);

  const editAccessCodeHandler = (data: any) => {
    const editParams = {
      ...data,
      type: accessCodeType?.value,
      status: accessCodeStatus?.value,
      times: accessCodeTimes,
      selectedDates,
      id: detail.id,
    };
    dispatch(accessCodeActions.UPDATE_ASYNC(editParams));
  }
  
  return (
    <form onSubmit={form.handleSubmit(editAccessCodeHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <SliderInput value={accessCodeTimes} onChange={setAccessCodeTimes}/>
            <DurationInput value={selectedDates} onChange={setSelectedDates}/>
            <AccessCodeStatus value={accessCodeStatus} onChange={setAccessCodeStatus} />
            <AccessCodeType value={accessCodeType} onChange={setAccessCodeType} />
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditAccessCodeForm;