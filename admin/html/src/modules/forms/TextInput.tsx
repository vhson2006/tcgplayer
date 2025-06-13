import { InputGroup, InputLeftElement, Icon, Input, InputRightElement, Text, FormControl, Stack, FormLabel } from "@chakra-ui/react"
import { inputSetting } from "modules/forms/config";
import { t, useFormatMessage } from "commons/languages/helper";
import { MdOutlineCheck } from "react-icons/md"

const TextInput = (props: any) => {
  const { typical,  errors, register, getValues, handleSubmit, setValue, trigger, ...otherProps } = props;

  return (
    <FormControl id={inputSetting[typical].name} isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        {
          inputSetting[typical].rules && inputSetting[typical].rules.hasOwnProperty('required') && inputSetting[typical].rules.required ? 
          <FormLabel minW={150} variant="inline">
            {t(inputSetting[typical].label)}&nbsp;<span style={{color: 'red'}}>*</span>
          </FormLabel> :
          <FormLabel minW={150} variant="inline">{t(inputSetting[typical].label)}</FormLabel>
        }
        <InputGroup >
          { 
            inputSetting[typical].icon ? 
            <InputLeftElement pointerEvents="none">
              <Icon as={inputSetting[typical].icon} color="fg.muted" boxSize="5" />
            </InputLeftElement> 
            : <></>
          }       
          <Input
            isInvalid={errors.hasOwnProperty(inputSetting[typical].name)}
            errorBorderColor='red.300'
            {...register(inputSetting[typical].name, inputSetting[typical].rules)} 
            placeholder={useFormatMessage({ id: inputSetting[typical].placeholder })} 
            {...otherProps}
          />
          {
            !errors.hasOwnProperty(inputSetting[typical].name) &&
            getValues(inputSetting[typical].name) != '' &&
            <InputRightElement>
              <Icon as={MdOutlineCheck} color="green.500" boxSize="5" />
            </InputRightElement>
          }
        </InputGroup>
      </Stack>
      {
        errors.hasOwnProperty(inputSetting[typical].name) &&
        <Stack pt="1">
          <Text color='tomato' fontSize='10px' align={'end'}>
            <i>{t(`error.${errors[inputSetting[typical].name].type}`)}</i>
          </Text>
        </Stack>
      }
    </FormControl>
  )
}

export default TextInput