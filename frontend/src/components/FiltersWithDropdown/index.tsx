import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { ProductBreadcrumb } from './ProductBreadcrumb'
import { SortbySelect } from './SortBySelect'
import {
  CheckboxFilterPopover,
  ColorFilterPopover,
  PriceFilterPopover,
  SizeFilterPopover,
} from './Filter'
import { MobileFilter } from './MobileFilter'
import ShopGrid from 'components/product/components/ShopGrid'
import { useSelector } from 'react-redux'
import ShopPagination from 'components/product/components/ShopPagination'
import useTranslation from 'next-translate/useTranslation'
import CenterSearchForm from 'components/product/components/CenterSearchForm'

export const FiltersWithDropdown = () => {
  const { error, total, isRequesting } = useSelector(({ product }: any) => product);
  const { t } = useTranslation("common");
  
  return (
    <Box mx="auto">
      <Heading size="lg" mt={{ base: '6', md: '10' }} mb="8">
      {t("product#title")}
      </Heading>
  
      <Flex justify="space-between" align="center" display={{ base: 'none', md: 'flex' }}>
          <Center w='800px' bg='green.500'>
            <CenterSearchForm width='100%'/>
          </Center>
  
        <HStack flexShrink={0}>
          <Text
            as="label"
            htmlFor="sort-by"
            color={mode('gray.600', 'gray.400')}
            fontWeight="medium"
            fontSize="sm"
            whiteSpace="nowrap"
          >
            {t('product#tags#label')}
          </Text>
          <SortbySelect maxW="400"/>
        </HStack>
      </Flex>
  
      <MobileFilter />
  
      <Box
        mt={{ base: '6', md: '10' }}
        minH="50vh"
        width="full"
        // borderWidth="3px"
        // rounded="lg"
        // borderStyle="dashed"
      >
        <ShopGrid />
      </Box>
      <Center pb={6}>
        <ShopPagination total={total}/>
      </Center>
    </Box>
  )
}
export default FiltersWithDropdown