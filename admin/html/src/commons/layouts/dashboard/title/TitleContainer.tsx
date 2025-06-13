import { useLocation } from 'react-router-dom';
import { t } from 'commons/languages/helper';
import { supportKeyRoute, supportLanguages } from 'commons/config';
import Title from 'commons/layouts/dashboard/title/TitleComponent';

const TitleContainer = (props: any) => {
  const location = useLocation();
  const generateKey = (key: string, path: string) => {
    const temp = path.split('/')
      .filter(e => e !== '' && Object.keys(supportLanguages).filter(f => f !== '/').includes(e) === false)
      .filter(e => supportKeyRoute.includes(e))
    return [key, ...temp].join('.').toString()
  } 
  return (
    <Title 
      title={t(generateKey('title', location.pathname))}
      description={t(generateKey('description', location.pathname))}
    />
  )
}

export default TitleContainer;