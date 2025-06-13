import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'
import { HiChevronRight } from 'react-icons/hi'

const pathData = {
  '/': [
    { label: 'breadcrumb#home', slug: '/' },
  ],
  '/privacy': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#privacy', slug: '/privacy' },
  ],
  '/terms': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#terms', slug: '/terms' },
  ],
  '/contact': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#contact', slug: '/contact' },
  ],
  '/news': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#news', slug: '/news' },
  ],
  '/news/[slug]': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#news', slug: '/news' },
    { label: 'breadcrumb#detail', slug: '/news/[slug]' },
  ],
  '/product': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#product', slug: '/product' },
  ],
  '/product/[slug]': [
    { label: 'breadcrumb#home', slug: '/' },
    { label: 'breadcrumb#product', slug: '/product' },
    { label: 'breadcrumb#detail', slug: '/product/[slug]' },
  ]
}
type StatusKey = keyof typeof pathData;

export const ProductBreadcrumb = (props: any) => {
  const {pathname} = useRouter();
  const { t } = useTranslation("common");
  const getBreadcrumb = () => {
    try {
      const rs = pathData[pathname as StatusKey]
      return Array.isArray(rs) && rs.length > 0 ? rs : []
    } catch (e) {
      return []
    }
  }
  return (
    <Breadcrumb
      mt={4}
      fontSize="sm"
      fontWeight="medium"
      color={mode('gray.600', 'gray.400')}
      separator={<Box as={HiChevronRight} color={mode('gray.400', 'gray.600')} />}
    >
      {getBreadcrumb().map((breadcrumb, index) => (
        <BreadcrumbItem key={breadcrumb.slug} isCurrentPage={index === getBreadcrumb().length - 1}>
          <BreadcrumbLink href={breadcrumb.slug}>{t(breadcrumb.label)}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default ProductBreadcrumb