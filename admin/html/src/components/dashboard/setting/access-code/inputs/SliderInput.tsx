import { 
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, 
  Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, InputGroup, Stack, 
  Box
} from "@chakra-ui/react"
import { t } from "commons/languages/helper";

const SliderInput = (props: any) => {
  const { isDisabled, value, onChange } = props;
  const handleChange = (value: any) => onChange(value);

  return (
    <FormControl id='accessCodeTimes'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.access-code-times.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <InputGroup >
          <NumberInput maxW='100px' mr='2rem' max={200} value={value} onChange={handleChange}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box w={'50%'} mr='1rem'>
          <Slider
            isDisabled={isDisabled}
            focusThumbOnChange={false}
            value={value}
            onChange={handleChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize='sm' boxSize='32px' children={value} />
          </Slider>
          </Box>
        </InputGroup>
      </Stack>
    </FormControl>
  )
}

export default SliderInput