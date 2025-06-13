import { Flex, Image, Link, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import useTranslation from 'next-translate/useTranslation'
import { makeArray } from 'utils/array'
import { MAX_QUANTITY_OPTIONS } from 'commons/consts'
import NextLink from "next/link";
import { makeUrl } from 'utils/link'

type CartItemProps = {
  id: string;
  slug: string
  name: string
  description: string
  quantity: number
  price: number
  currency: string
  image: any
  onChangeQuantity?: (quantity: number, id: string) => void
  onClickDelete: (id: string) => void
}

export const CartItem = (props: CartItemProps) => {
  const {
    id,
    slug,
    name,
    description,
    quantity,
    image,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props
  const { t, lang } = useTranslation("common");
  
  return (
    <Stack direction="row" spacing="5">
      <Image
        rounded="md"
        height={{ base: '24', md: '32' }}
        fit="cover"
        aspectRatio={300/443}
        src={image[0]?.url}
        alt={image[0]?.alt}
        draggable="false"
        loading="lazy"
      />
      <Stack width="full" spacing="3">
        <Stack direction={{ base: 'column', md: 'row' }} spacing="3" alignItems="flex-start">
          <Stack spacing="0.5" width="full">
            <Text fontWeight="medium">
              <NextLink href={makeUrl(`/product/${slug}`, lang)} passHref>
                {name}
              </NextLink>
            </Text>
            <Text color={useColorModeValue('gray.500', 'gray.300')}>{description.substring(0, 15)}...</Text>
          </Stack>
          <PriceTag price={price*quantity} currency={'VND'} />
        </Stack>
        <Flex width="full" justifyContent="space-between" alignItems="center">
          <Select
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            width="16"
            height="8"
            defaultValue={quantity}
            onChange={(e) => {
              onChangeQuantity?.(+e.currentTarget.value, id)
            }}
          >
            {
              makeArray(Math.max(MAX_QUANTITY_OPTIONS, quantity))
                .map((v: any) => v + 1)
                .map((v: any) => <option key={v} value={v}>{v}</option>)
            }
          </Select>
          <Link
            as="button"
            type="button"
            fontWeight="medium"
            fontSize="sm"
            color={useColorModeValue('blue.500', 'blue.200')}
            onClick={() => onClickDelete(id)}
          >
            {t('button#delete')}
          </Link>
        </Flex>
      </Stack>
    </Stack>
  )
}