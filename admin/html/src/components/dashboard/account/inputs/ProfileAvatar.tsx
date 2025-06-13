import { Stack, FormLabel, InputGroup, Avatar } from "@chakra-ui/react"
import { t } from "commons/languages/helper";
import Dropzone from "modules/forms/Dropzone"
import { useSelector } from "react-redux";

const ProfileAvatar = (props: any) => {
  const { isDisabled, uploadedFiles, setUploadedFiles } = props;
  const { profile } = useSelector((state: any) => state.accountReducer); 

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: '1.5', md: '8' }}
      justify="space-between"
    >
      <FormLabel mx={0} minW={150} variant="inline">{t('input.avatar.label')}</FormLabel>
      <InputGroup>
        <Avatar size="md" name="Christoph Winston" src={profile?.avatar} />
        <Dropzone isDisabled={isDisabled} mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
      </InputGroup>
    </Stack>
  )
}

export default ProfileAvatar