import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";

const ProductCategory = (props: any) => {
  const dispatch = useDispatch();
  const { isMulti, isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { productCategory } = useSelector((state: any) => state.commonReducer); 

  useEffect(() => {
    if (Array.isArray(productCategory) && productCategory.length < 1) {
      dispatch(actions.FETCH_PRODUCT_CATEGORY())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_PRODUCT_CATEGORY())
  }, [activedLanguage]);
 
  return (
    <FormControl id="productCategory">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.product-category.label')}</FormLabel>
        <Box w='100%'>
          <CustomSelect 
            isClearable
            isDisabled={isDisabled}
            isMulti={isMulti ? isMulti : false}
            isFloating
            isRequired
            name="productCategory"
            placeholder={t('input.product-category.placeholder')}
            value={value}
            onChange={onChange}
            options={productCategory} 
          />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default ProductCategory