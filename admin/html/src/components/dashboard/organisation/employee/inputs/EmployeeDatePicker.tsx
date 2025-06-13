import { Stack, FormLabel, Box } from "@chakra-ui/react"
import { t } from "commons/languages/helper"
import DatePicker from "modules/libs/DatePicker"

const EmployeeDatePicker = (props: any) => {
  const { value, onChange, isDisabled } = props;

  return (
    <Stack
      direction={{ base: 'column', xl: 'row' }}
      spacing={{ base: '1.5', xl: '8' }}
      justify="space-between"
    >
      <FormLabel mx={0} minW={150}>{t('input.dob.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
      <Box className={isDisabled ? 'is-disable' : ''} w={'100%'}>
        <DatePicker date={value} onDateChange={onChange} />
      </Box>
    </Stack>
  )
}

export default EmployeeDatePicker