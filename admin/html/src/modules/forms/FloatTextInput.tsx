import { InputGroup, InputLeftElement, Icon, Input, InputRightElement, Text, FormControl, Stack, FormLabel } from "@chakra-ui/react"
import { inputSetting } from "modules/forms/config";
import { t } from "commons/languages/helper";
import { MdOutlineCheck } from "react-icons/md"
import { useState } from "react";

const FloatTextInput = (props: any) => {
  const { typical,  errors, register, getValues, handleSubmit, setValue, trigger, ...otherProps } = props;

  return (
    <FormControl 
      variant="floating"
      id={inputSetting[typical].name} 
      isInvalid={true}
      // maxW="xs"
    >
      <InputGroup >
        { 
          inputSetting[typical].icon ? 
          <InputLeftElement pointerEvents="none">
            <Icon as={inputSetting[typical].icon} color="fg.muted" boxSize="4" />
          </InputLeftElement> 
          : <></>
        }       
        <Input
          isInvalid={errors.hasOwnProperty(inputSetting[typical].name)}
          errorBorderColor='red.300'
          type={inputSetting[typical].name !== 'password' ? 'text' : 'password'}
          {...register(inputSetting[typical].name, inputSetting[typical].rules)} 
          placeholder={''} 
          {...otherProps}
        />
        {
          inputSetting[typical].rules && inputSetting[typical].rules.hasOwnProperty('required') && inputSetting[typical].rules.required ? 
          <FormLabel>
            {t(inputSetting[typical].placeholder)}&nbsp;<span style={{color: 'red'}}>*</span>
          </FormLabel> :
          <FormLabel>{t(inputSetting[typical].placeholder)}</FormLabel>
        }
        {
          !errors.hasOwnProperty(inputSetting[typical].name) &&
          getValues(inputSetting[typical].name) != '' &&
          <InputRightElement>
            <Icon as={MdOutlineCheck} color="green.500" boxSize="5" />
          </InputRightElement>
        }
      </InputGroup>
      {
        errors.hasOwnProperty(inputSetting[typical].name) &&
        <Stack pt="1">
          <Text color='tomato' fontSize='10px'>
            <i>{t(`error.${errors[inputSetting[typical].name].type}`)}</i>
          </Text>
        </Stack>
      }
    </FormControl>
  )
}

export default FloatTextInput