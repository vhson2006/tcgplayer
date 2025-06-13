import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";

const PaymentStatus = (props: any) => {
  const dispatch = useDispatch();
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { paymentStatus } = useSelector((state: any) => state.commonReducer); 

  useEffect(() => {
    if (Array.isArray(paymentStatus) && paymentStatus.length < 1) {
      dispatch(actions.FETCH_PAYMENT_STATUS())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_PAYMENT_STATUS())
  }, [activedLanguage]);
 
  return (
    <FormControl id="paymentStatus">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.payment-status.label')}</FormLabel>
        <Box w='100%'>
          <CustomSelect 
            isClearable
            isDisabled={isDisabled}
            isMulti={isMulti ? isMulti : false}
            isFloating
            isRequired
            name="paymentStatus"
            placeholder={t('input.payment-status.placeholder')}
            value={value}
            onChange={onChange}
            options={paymentStatus} 
          />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default PaymentStatus