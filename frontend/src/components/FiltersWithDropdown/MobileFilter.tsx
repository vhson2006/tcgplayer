import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { MdFilterList } from 'react-icons/md'
import { CheckboxFilter } from './CheckboxFilter'
import { ColorPicker } from './ColorPicker'
import { FilterDrawer } from './FilterDrawer'
import { PriceRangePicker } from './PriceRangePicker'
import { SizePicker } from './SizePicker'
import { SortbySelect } from './SortBySelect'
import { blueFilters, colorFilter, sizeFilter } from './_data'
import useTranslation from 'next-translate/useTranslation'

export const MobileFilter = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
    const { t } = useTranslation("common");
  
  return (
    <>
      <Flex width="full" justify="space-between" display={{ base: 'flex', md: 'none' }}>
        {/* <HStack
          as="button"
          fontSize="sm"
          type="button"
          px="3"
          py="1"
          onClick={onOpen}
          borderWidth="1px"
          rounded="md"
        >
          <Icon as={MdFilterList} />
          <Text>Filters</Text>
        </HStack> */}
        <HStack spacing="6"></HStack>
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
        <SortbySelect width="120px" />
        </HStack>
      </Flex>
      {/* <FilterDrawer isOpen={isOpen} onClose={onClose}>
        <Stack spacing="6" divider={<StackDivider />}>
          <CheckboxFilter label="Brands" options={blueFilters.options} />
          <MobilePriceFilter />
          <MobileSizeFilter />
          <MobileColorFilter />
        </Stack>
      </FilterDrawer> */}
    </>
  )
}

const MobilePriceFilter = () => {
  return (
    <Box>
      <Box fontWeight="semibold" mb="2">
        Price range
      </Box>
      <Box marginStart="2">
        <PriceRangePicker defaultValue={[0, 50]} />
      </Box>
      <HStack spacing="4" mt="4">
        <HStack spacing="4">
          <Text color="gray.500" fontSize="sm">
            min
          </Text>
          <Input aria-label="Minimum price" type="number" defaultValue={10} />
        </HStack>
        <Divider width="8" opacity={1} />
        <HStack spacing="4">
          <Text color="gray.500" fontSize="sm">
            max
          </Text>
          <Input aria-label="Maximum price" type="number" defaultValue={50} />
        </HStack>
      </HStack>
    </Box>
  )
}

const MobileSizeFilter = () => {
  return (
    <Box>
      <Box fontWeight="semibold" mb="2">
        Size
      </Box>
      <SizePicker hideLabel {...sizeFilter} />
    </Box>
  )
}

const MobileColorFilter = () => {
  return (
    <Box>
      <Box fontWeight="semibold" mb="2">
        Color
      </Box>
      <ColorPicker rootProps={{ mt: '2' }} hideLabel {...colorFilter} />
    </Box>
  )
}
