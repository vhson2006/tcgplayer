import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { seoData } from "./setting";
import { useSelector } from "react-redux";
import { jsonParse } from "utils/json";

export const SeoHead = (props: any) => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const defaultSeo = { path: '/', title: 'seo#home#title', description: 'seo#description' };
  const { title, description }: any = seoData.find((s: any) => s.path === router.pathname) || defaultSeo;
  const { detail: productDetail } = useSelector(({ product }: any) => product);
  const { detail: newsDetail } = useSelector(({ news }: any) => news);

  const renderTitle = () => {
    if (title === 'news') {
      return jsonParse(newsDetail.title)[lang]
    }
    if (title === 'product') {
      return productDetail.name
    }
    return t(title)
  }

  const renderDescription = () => {
    if (title === 'news') {
      return jsonParse(newsDetail.predefine)[lang]
    }
    if (title === 'product') {
      return productDetail?.storage?.description
    }
    return t(description)
  }

  if (!productDetail || !newsDetail) return null;

  return (
    <Head>
      <title>{renderTitle()}</title>
      <meta name="description" content={renderDescription()} />
      <meta name="twitter:title" content={renderTitle()} />
      <meta name="twitter:description" content={renderDescription()} />
      <meta property="og:title" content={renderTitle()} />
      <meta property="og:description" content={renderDescription()} />

      <link rel="shortcut icon" href="/favicon.ico" />
      <meta httpEquiv="content-language" content={lang} />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* <meta name="geo.placename" content="Ho Chi Minh, Việt Nam" />
      <meta name="geo.position" content="10.822;106.6257" />
      <meta name="geo.region" content="VN-Hochiminh" />
      <meta name="ICBM" content="10.822;106.6257" /> */}

      <meta name="twitter:image" content="https://res.cloudinary.com/datasource/image/upload/v1731404922/shanovina/OIG3.GMJyWZDs_ui.Hutbuoo__ckhcyd.jpg" />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={renderTitle()} />
      <meta property="og:image" content="https://res.cloudinary.com/datasource/image/upload/v1731404922/shanovina/OIG3.GMJyWZDs_ui.Hutbuoo__ckhcyd.jpg" />
      {/* <meta property="fb:app_id" content="456616084420060" /> */}
    </Head>
  );
};
