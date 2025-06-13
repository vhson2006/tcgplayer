import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { paramRoute } from 'commons/config';
import { t, useFormatMessage } from 'commons/languages/helper';
import { Link, useLocation, useParams } from 'react-router-dom';
import { makeUrl } from 'utils/link';

const BreadcrumbComponent = (props: any) => {
  const location = useLocation();
  const params: any = useParams();
  const { breadcrumbs } = props;
  const editeText = useFormatMessage({ id: 'breadcrum.edit' });

  const extraBreadcrumb = (): any[] => {
    const detail = paramRoute.find((p: any) => params[p]);
    if (detail !== undefined) {
      if (location.pathname.search('edit') !== -1) {
        return [
          { text: params[detail as any], link: `${breadcrumbs[breadcrumbs.length - 1].link}/${params[detail as any]}` },
          { 
            text: editeText, 
            link: `${breadcrumbs[breadcrumbs.length - 1].link}/${params[detail as any]}/edit` 
          }
        ]
      } else {
        return [
          { text: params[detail as any], link: `${breadcrumbs[breadcrumbs.length - 1].link}/${params[detail as any]}` }
        ]
      }
    }
    return []
  }

  return (
    <Breadcrumb>
      {
        breadcrumbs
        .map((breadcrum: any, index: number, row: any) => 
          <BreadcrumbItem key={index} isCurrentPage={index + 1 === row.length && extraBreadcrumb().length === 0 ? true : false}>
            {
              index + 1 === row.length && extraBreadcrumb().length === 0 ?
              <BreadcrumbLink>{t(breadcrum.key)}</BreadcrumbLink> :
              <BreadcrumbLink as={Link} to={makeUrl(breadcrum.link, location)}>
                {t(breadcrum.key)}
              </BreadcrumbLink>
            }
          </BreadcrumbItem>
        )
      }
      {
        extraBreadcrumb()
        .map((ex: any, index: number, row: any) => ex && 
          <BreadcrumbItem key={ex.text} isCurrentPage={index + 1 === row.length ? true : false}>
            {
              index + 1 === row.length ?
              <BreadcrumbLink>{ex.text.toString()}</BreadcrumbLink> :
              <BreadcrumbLink as={Link} to={makeUrl(ex.link, location)}>
                {ex.text}
              </BreadcrumbLink>
            }
          </BreadcrumbItem>
        )
      }
    </Breadcrumb>
  )
}

export default BreadcrumbComponent