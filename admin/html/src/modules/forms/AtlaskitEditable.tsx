import {
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
  EditableTextarea,
  HStack,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { t } from 'commons/languages/helper';

const AtlaskitEditable = (props: any) => {
  const { name, register, rules, errors } = props;
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2}>
        <IconButton 
          icon={<CheckIcon />} 
          aria-label={''} 
          {...getSubmitButtonProps()} 
        />
        <IconButton
          aria-label={''}
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null
  }

  return (
    <Editable
      defaultValue='Rasengan ⚡️'
      isPreviewFocusable={true}
      selectAllOnFocus={false}
    >
      <Tooltip label={t('tooltip.editable')} shouldWrapChildren={true}>
        <EditablePreview
          border={errors.hasOwnProperty(name) ? '1px solid red' : undefined}
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue('gray.100', 'gray.700'),
          }}
        />
      </Tooltip>
      
      <HStack>
        {/* <Input 
          py={2} 
          px={4} 
          as={EditableInput} 
          isInvalid={errors.hasOwnProperty(name)}
          errorBorderColor='red.300'
          {...register(name, rules)} 
        /> */}
                  <Textarea as={EditableTextarea} py={2} 
          px={4}  maxW={{ md: '3xl' }} rows={5} resize="none" />

        <EditableControls />
      </HStack>
      {
        errors.hasOwnProperty(name) &&
        <Stack pt="1">
          <Text color='tomato' fontSize='8px'>
            <i>{t(`error.${errors[name].type}`)}</i>
          </Text>
        </Stack>
      }
    </Editable>
  )
}

export default AtlaskitEditable