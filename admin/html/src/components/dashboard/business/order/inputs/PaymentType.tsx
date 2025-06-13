import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const PaymentType = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { paymentType } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(paymentType) && paymentType.length < 1) {
      dispatch(actions.FETCH_PAYMENT_TYPE())
    }
  }, []);

  useEffect(() => {
    dispatch(actions.FETCH_PAYMENT_TYPE())
  }, [activedLanguage]);
 
  return (
    <FormControl id='paymentType' >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel minW={150} m={0}>{t('input.payment-type.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="paymentType"
          placeholder={t('input.payment-type.placeholder')}
          value={value}
          onChange={onChange}
          options={paymentType} 
        />
      </Stack>
    </FormControl>
  )
}

export default PaymentType