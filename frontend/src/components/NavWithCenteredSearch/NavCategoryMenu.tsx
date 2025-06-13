import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  HStack,
  Stack,
  Image,
  Text,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { MobileAccentComponent } from 'commons/layouts/menus/MobileAccentComponent'
import { useSelector } from 'react-redux'
import NextLink from "next/link";
import { makeUrl } from 'utils/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DesktopNavCategoryMenu = () => {
  const { newsCategory, productCategory } = useSelector(({ common }: any) => common);
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();
  const [ actived, setActived ] = useState<string>('/');
  
  useEffect(() => {
    setActived(asPath.split('?')[0])
  }, [asPath])
  return (
    <Box
      as="nav" 
      color='white'
      bg="bg-accent"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      // borderColor={mode('gray.200', 'gray.700')}
      // bg={mode('white', 'gray.800')}
      px="8"
    >
      <Box maxW="8xl" mx="auto">
        <HStack spacing="8">
        <NextLink href={makeUrl('/', lang)}>
          {/* <Image src="/logo.png" height="8" alt="Yugioh"/>&nbsp;{t("menu#home")} */}
          <Link
            py={3}
            color={['/', ''].includes(actived) ? "yellow.500" : 'on-accent'}
            fontWeight={['/', ''].includes(actived) ? "bold" : 'normal'}

          >
            {t("menu#home")}
          </Link>
        </NextLink>
        
        {
          newsCategory?.map((e: any, idx: any) => (
            <NextLink key={idx} href={makeUrl(`/news?category="${e.value}"`, lang)} passHref>
              <Link
                color={actived === `/news` ? "yellow.500" : 'on-accent'}
                fontWeight={actived === `/news` ? "bold" : 'normal'}

              >
                {e.label}
              </Link>
            </NextLink>
          ))
        }
        {
          productCategory?.map((e: any, idx: any) => (
            <NextLink key={idx} href={makeUrl(`/product?category="${e.value}"`, lang)} passHref>
              <Link
                color={actived === `/product` ? "yellow.500" : 'on-accent'}
                fontWeight={actived === `/product` ? "bold" : 'normal'}

              >
                {e.label}
              </Link>
            </NextLink>
          ))
        }
        <NextLink href={makeUrl('/contact', lang)} passHref>
          <Link
            color={actived === `/contact` ? "yellow.500" : 'on-accent'}
            fontWeight={actived === `/contact` ? "bold" : 'normal'}

          >
             {t("menu#contact")}
          </Link>
        </NextLink>
        </HStack>
      </Box>
    </Box>
  )
}

export const NavCategoryMenu = {
  Mobile: MobileAccentComponent,
  Desktop: DesktopNavCategoryMenu,
}
