import { ButtonGroup, Button, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { makeUrl } from "utils/link";
import { useSelector } from "react-redux";

export const DesktopAccentComponent = () => {
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();
  const { newsCategory, productCategory } = useSelector(({ common }: any) => common);

  const clearGetParam = (asPath: any) => {
    return asPath.substr(0, asPath.indexOf('?'))
  }

  return (
    <>
      <ButtonGroup variant="ghost-on-accent" spacing="1">
        <NextLink href={makeUrl('/', lang)} passHref>
          <Button aria-current={asPath === "/" ? "page" : undefined}>
            <Image src="/logo.png" height="8" alt="Yugioh"/>&nbsp;{t("menu#home")}
          </Button>
        </NextLink>
        {
          newsCategory?.map((e: any, idx: any) => (
            <NextLink key={idx} href={makeUrl(`/news?category="${e.value}"`, lang)} passHref>
              <Button aria-current={clearGetParam(asPath) === `/news` ? "page" : undefined}>
                {e.label}
              </Button>
            </NextLink>
          ))
        }
        {
          productCategory?.map((e: any, idx: any) => (
            <NextLink key={idx} href={makeUrl(`/product?category="${e.value}"`, lang)} passHref>
              <Button aria-current={clearGetParam(asPath) === `/product` ? "page" : undefined}>
                {e.label}
              </Button>
            </NextLink>
          ))
        }
        <NextLink href={makeUrl('/contact', lang)} passHref>
          <Button aria-current={asPath === "/contact" ? "page" : undefined}>
            {t("menu#contact")}
          </Button>
        </NextLink>
      </ButtonGroup>
    </>
  );
};
