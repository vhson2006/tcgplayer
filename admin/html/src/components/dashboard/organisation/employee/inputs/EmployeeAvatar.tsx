import { Stack, FormLabel, InputGroup, Avatar } from "@chakra-ui/react"
import { t } from "commons/languages/helper";
import Dropzone from "modules/forms/Dropzone"
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slice";

const EmployeeAvatar = (props: any) => {
  const { isDisabled, uploadedFiles, setUploadedFiles } = props;
  const { detail } = useSelector((state: any) => state.employeesReducer); 
  const dispatch = useDispatch();
  const uploadState = (state: boolean) => {
    if (state) {
      dispatch(actions.IS_LOADING())
    } else {
      dispatch(actions.IS_DONE())
    }
  }
  
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: '1.5', md: '8' }}
      justify="space-between"
    >
      <FormLabel mx={0} minW={150} variant="inline">{t('input.avatar.label')}</FormLabel>
      <InputGroup>
        <Avatar size="md" name="Christoph Winston" src={detail?.avatar?.url || ''} />
        <Dropzone 
          isDisabled={isDisabled} 
          mx={1} 
          width="full" 
          isMulti={false} 
          uploadedFiles={uploadedFiles} 
          setUploadedFiles={setUploadedFiles}
          uploadState={uploadState}
        />
      </InputGroup>
    </Stack>
  )
}

export default EmployeeAvatar