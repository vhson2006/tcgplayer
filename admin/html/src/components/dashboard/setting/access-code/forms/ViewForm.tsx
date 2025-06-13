import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AccessCodeType from "components/dashboard/setting/access-code/inputs/AccessCodeType";
import AccessCodeStatus from "components/dashboard/setting/access-code/inputs/AccessCodeStatus";
import SliderInput from "components/dashboard/setting/access-code/inputs/SliderInput";
import DurationInput from "components/dashboard/setting/access-code/inputs/Duration";
import { jsonParse } from "utils/json";

const ViewAccessCodeForm = (props: any) => {
  const [ accessCodeType, setAccessCodeType ] = useState<any[]>([]);
  const [ accessCodeStatus, setAccessCodeStatus ] = useState<any[]>([]);
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const [ accessCodeTimes, setAccessCodeTimes ] = useState<any>(1);
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
  
  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <SliderInput value={accessCodeTimes} onChange={setAccessCodeTimes} isDisabled={true}/>
          <DurationInput value={selectedDates} onChange={setSelectedDates} isDisabled={true}/>
          <AccessCodeStatus value={accessCodeStatus} onChange={setAccessCodeStatus} isDisabled={true} bg={'gray.100'}/>
          <AccessCodeType value={accessCodeType} onChange={setAccessCodeType} isDisabled={true} bg={'gray.100'}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewAccessCodeForm;