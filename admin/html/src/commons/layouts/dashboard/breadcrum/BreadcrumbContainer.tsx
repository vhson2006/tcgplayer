import { useLocation } from 'react-router-dom';
import { supportKeyRoute, supportLanguages } from 'commons/config';
import BreadcrumbComponent from 'commons/layouts/dashboard/breadcrum/BreadcrumbComponent';

const BreadcrumbContainer = () => {
  const location = useLocation();
  const generateBreadcrumb = (path: string) => {
    const breadcrumbs = path.split('/')
      .filter(e => e !== '' && Object.keys(supportLanguages).filter(f => f !== '/').includes(e) === false)
      .filter(e => supportKeyRoute.includes(e))
      .reduce((final: any, current: any, currentIndex: number) => {
        let currentElement = {}
        if (currentIndex === 0) {
          return [
            {
              link: `/${current}`,
              key: `breadcrum.${current}`,
            }
          ]
        } else {
          currentElement = {
            link: `${final[currentIndex - 1].link}/${current}`,
            key: `breadcrum.${current}`,
          }
          final.push(currentElement)
          return final
        }
      }, [])
      
    breadcrumbs.unshift({
      link: `/`,
      key: `breadcrum`,
    })
    return breadcrumbs
  } 
  return <BreadcrumbComponent breadcrumbs={generateBreadcrumb(location.pathname)} />
}

export default BreadcrumbContainer