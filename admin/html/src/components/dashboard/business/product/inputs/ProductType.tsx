import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const ProductType = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { productType } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(productType) && productType.length < 1) {
      dispatch(actions.FETCH_PRODUCT_TYPE())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_PRODUCT_TYPE())
  }, [activedLanguage]);
 
  return (
    <FormControl id='productType' isInvalid={true}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel m={0} minW={150}>{t('input.product-type.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="productType"
          placeholder={t('input.product-type.placeholder')}
          value={value}
          onChange={onChange}
          options={productType} 
        />
      </Stack>
    </FormControl>
  )
}

export default ProductType