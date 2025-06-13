import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "modules/selects";
import { t } from "commons/languages/helper";
import { actions } from 'commons/const/slice';
import { FormControl, Stack, FormLabel, Box } from "@chakra-ui/react";

const ProductTag = (props: any) => {
  const dispatch = useDispatch();
  const { isDisabled, value, onChange } = props;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { productTag } = useSelector((state: any) => state.commonReducer); 

  useEffect(() => {
    if (Array.isArray(productTag) && productTag.length < 1) {
      dispatch(actions.FETCH_PRODUCT_TAG())
    }
  }, [])

  useEffect(() => {
    dispatch(actions.FETCH_PRODUCT_TAG())
  }, [activedLanguage]);
 
  return (
    <FormControl id="productTag">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '1.5', md: '8' }}
        justify="space-between"
      >
        <FormLabel mx={0} minW={150}>{t('input.product-tag.label')}</FormLabel>
        <Box w='100%'>
          <CustomSelect 
            isClearable
            isDisabled={isDisabled}
            isMulti
            isFloating
            isRequired
            name="productTag"
            placeholder={t('input.product-tag.placeholder')}
            value={value}
            onChange={onChange}
            options={productTag} 
          />
        </Box>
      </Stack>
    </FormControl>
  )
}

export default ProductTag