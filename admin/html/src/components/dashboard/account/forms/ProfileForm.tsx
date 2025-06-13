import { Stack, Card, CardBody, StackDivider, Button, VisuallyHidden } from "@chakra-ui/react"
import TextInput from "modules/forms/TextInput"
import { useForm } from "react-hook-form"
import { defaultForm } from "utils/form"
import ProfileAvatar from "components/dashboard/account/inputs/ProfileAvatar";
import { useState } from "react"
import notify from "utils/notify";
import { t } from "commons/languages/helper";

const ProfileForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const { submitRef } = props;

  const updateProfile = (data: any) => {
    console.log({ ...data, uploadedFiles })
    notify.success(t('message.success'))
  }
  return (
    <form onSubmit={form.handleSubmit(updateProfile)}>
      <Stack direction={{ base: 'column', lg: 'row' }} justify="space-between">
        <Card w='100%'>
          <CardBody>
            <Stack spacing="5" divider={<StackDivider />}>
              <TextInput {...form} typical='name' />
              <ProfileAvatar uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
              <VisuallyHidden>
                <Button type="submit" ref={submitRef}/>
              </VisuallyHidden>
            </Stack>  
          </CardBody>
        </Card>
      </Stack>
    </form>
  ) 
}

export default ProfileForm