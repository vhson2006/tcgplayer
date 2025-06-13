import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel } from "@chakra-ui/react";

const ProductStatus = (props: any) => {
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { productStatus } = useSelector((state: any) => state.commonReducer); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(productStatus) && productStatus.length < 1) {
      dispatch(actions.FETCH_PRODUCT_STATUS())
    }
  }, []);

  useEffect(() => {
    dispatch(actions.FETCH_PRODUCT_STATUS())
  }, [activedLanguage]);
 
  return (
    <FormControl id='productStatus' >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel minW={150} m={0}>{t('input.product-status.label')}&nbsp;<span style={{color: 'red'}}>*</span></FormLabel>  
        <CustomSelect 
          isDisabled={isDisabled}
          isClearable
          isMulti={isMulti ? isMulti : false}
          isFloating
          isRequired
          name="productStatus"
          placeholder={t('input.product-status.placeholder')}
          value={value}
          onChange={onChange}
          options={productStatus} 
        />
      </Stack>
    </FormControl>
  )
}

export default ProductStatus