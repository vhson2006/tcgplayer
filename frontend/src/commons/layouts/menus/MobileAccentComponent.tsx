import { Menu, MenuButton, Button, MenuList, MenuItem, Image, HStack, Text, Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { makeUrl } from "utils/link";

export const MobileAccentComponent = () => {
  const { t, lang } = useTranslation("common");
  const { newsCategory, productCategory } = useSelector(({ common }: any) => common);
  
  return (
    <Menu >
      <MenuButton
        as={Button}
        variant={"ghost-on-accent"}
        cursor={"pointer"}
        minW={0}
      >
        <Box as={MdMenu} fontSize="2xl" />
        {/* <HStack>
          <Image src="/logo.png" height="8" alt="Yugioh" />&nbsp;
          <Text color={'on-accent'} fontWeight='bold' textTransform="uppercase">{t("menu#home")}</Text>
        </HStack> */}
      </MenuButton>
      <MenuList>
        <MenuItem>
          <NextLink href={makeUrl('/', lang)} passHref>
            {t("menu#home")}
          </NextLink>
        </MenuItem>
        {
          newsCategory?.map((e: any, idx: any) => (
            <MenuItem key={idx}>
              <NextLink href={makeUrl(`/news?category="${e.value}"`, lang)} passHref>
                {e.label}
              </NextLink>
            </MenuItem>
          ))
        }
        {
          productCategory?.map((e: any, idx: any) => (
            <MenuItem key={idx}>
              <NextLink href={makeUrl(`/product?category="${e.value}"`, lang)} passHref>
                {e.label}
              </NextLink>
            </MenuItem>
          ))
        }
        <MenuItem>
          <NextLink href={makeUrl('/contact', lang)} passHref>
            {t("menu#contact")}
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
