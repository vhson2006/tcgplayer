import { Box, HStack, Stack, Tag, Text, useColorModeValue, Button, Tooltip } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { PriceTag } from "components/product/components/PriceTag";
import { Rating } from "components/product/components/Rating";
import NextLink from "next/link";
import { makeUrl } from "utils/link";
import { Gallery } from "./Gallery";
import { jsonParse } from "utils/json";
import { QuantityPicker } from "modules/inputs/QuantityPicker";

export const ProductCard = (props: any) => {
  const { product, addToCart } = props;
  const { t, lang } = useTranslation("common");

  return (
    <Stack spacing={{ base: "3", md: "5" }} bg={'white'} p={4}>
      <Box position="relative">
        <Gallery rootProps={{ overflow: 'hidden', flex: '1' }} images={[{alt: product.name, url: product?.image}]}/>
        <HStack spacing="3" position="absolute" top="3"
          right="3">
          {product?.productTags?.map((tag: any) => (
            <Tag
              key={tag.id}
              bg={`orange.500`}
              color="white"
              fontWeight="semibold"
            >
              {jsonParse(tag.typeName)[lang]}
            </Tag>
          ))}
        </HStack>
      </Box>
      <Button onClick={(e) => addToCart(product.id)} variant="primary">
        {t("button#add")}
      </Button>
      <Stack>
        <Stack spacing="0.25">
          <Tooltip label={product?.name}>
          <Text fontWeight="medium" noOfLines={1}>
            <NextLink href={makeUrl(`/product/${product.slug}`, lang)} passHref>
              {product.name}
            </NextLink>
          </Text>
          </Tooltip>
          <Text noOfLines={3}>{product.storage.serial}</Text>
          <Text noOfLines={3}>{product.storage.rarity}</Text>

        </Stack>
        <PriceTag
          currency="VND"
          price={product.price}
          priceProps={{ color: useColorModeValue("gray.800", "gray.200") }}
          // salePrice={product.promotionPrice}
          salePriceProps={{
            color: useColorModeValue("red.500", "red.400"),
            fontWeight: "bold",
          }}
        />
        {/* <HStack>
          <Rating defaultValue={product.rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            12 {t("shops#details#reviews")}
          </Text>
        </HStack> */}
      </Stack>
    </Stack>
  );
};
