import { supportLanguages } from 'commons/config';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { actions } from 'commons/header/slice';
import { useFormatMessage } from 'commons/languages/helper';

const HelmetComponent = (props: any) => {
  const { children } = props;
  const { title, description, socialImage } = useSelector((state: any) => state.headerReducer.meta); 
  const dispatch =  useDispatch()
  const [ language, setActivedLanguage ] = useState('en');
  const location = useLocation();

  useEffect(() => {
    dispatch(actions.GET_META(location.pathname))
    const path = location.pathname.split('/').filter(e => e);
    if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
      setActivedLanguage(path[0])
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <title>{useFormatMessage({ id: title })}</title>
      <meta name="description" content={useFormatMessage({ id: description })}></meta>
      <meta httpEquiv="content-language" content={language} />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta name="geo.placename" content="Ho Chi Minh, Việt Nam" />
      <meta name="geo.position" content="10.822;106.6257" />
      <meta name="geo.region" content="VN-Hochiminh" />
      <meta name="ICBM" content="10.822;106.6257" />

      <meta name="twitter:title" content={useFormatMessage({ id: title })} />
      <meta name="twitter:description" content={useFormatMessage({ id: description })} />
      <meta name="twitter:image" content={socialImage} />

      <meta property="fb:app_id" content="456616084420060" />
      <meta property="og:title" content={useFormatMessage({ id: title })} />
      <meta property="og:description" content={useFormatMessage({ id: description })} />
      <meta property="og:image" content={socialImage} />
      {/* 
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="TCG Player Online" /> 
      */}
      {children}
    </HelmetProvider>
  )
}

export default HelmetComponent
