import { Box, FormControl, FormLabel, Stack } from "@chakra-ui/react"
import { RangeDatepicker } from "modules/libs/DatePicker";
import { t } from "commons/languages/helper";

const ProductDuration = (props: any) => {
  const { isDisabled, value, onChange } = props;

  return (
    <FormControl id='productDuration'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.product-duration.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>
        <Box w={'100%'}>
          <RangeDatepicker isDisabled={isDisabled} value={value} onChange={onChange}/>
        </Box>  
      </Stack>
    </FormControl>
  )
}

export default ProductDuration