import { Box, SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "components/product/components/ProductCard";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import notify from "utils/notify";
import { actions as cartActions } from 'components/product/cart-slice';

const ShopGrid = (props: any) => {
  const { t } = useTranslation("common");
  const { list } = useSelector(({ product }: any) => product);
  const dispatch = useDispatch();

  const addItemToCart = (id: string) => {
    const { name, slug, description, price, productImages, storage, image } = list.find((item: any) => item.id === id);
    dispatch(cartActions.ADD_ITEM({
      id, 
      slug,
      name,
      description,
      price: price,
      image: [
        {
          url: image,
          alt: name
        }
      ],
      quantity: 1 
    }))
    notify.success(t('message#product#add'));
  };

  return (
    <Box
      // maxW="10xl"
      mx="auto"
      // px={{ base: "2", md: "4", lg: "6" }}
      py={{ base: "2", md: "4", lg: "6" }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={{ base: "4", lg: "6" }}
      >
        {list.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addItemToCart}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ShopGrid
