import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";
import { t } from "commons/languages/helper";
import CKEditorComponent from "modules/libs/ckeditor";

const ContentEditor = (props: any) => {
  const { referent, defaultValue } = props;
  return (
    <FormControl>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.news-content.label')}</FormLabel>
        <Box w='100%'>
          <CKEditorComponent referent={referent} data={defaultValue} />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default ContentEditor