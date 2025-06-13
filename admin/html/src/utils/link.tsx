import { supportLanguages } from 'commons/config';
import { useLocation } from 'react-router-dom';
import { jsonParse } from './json';

export const makeUrl = (url: string, location: any) => {
  const path = location.pathname.split('/').filter((e: any) => e);
  if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
    return `/${path[0]}${url}`
  } else {
    return url
  }
}

export const usePath = () => {
  const location = useLocation();
  const fullPath = `${location.pathname}${location.search}`;
  const searchParams = new URLSearchParams(location.search);

  let params: any = {};
  searchParams.forEach((value, key) => {
    if (searchParams.getAll(key).length > 1) {
      params[key] = searchParams
        .getAll(key)
        .map((p: any) => {
          try {
            const temp = jsonParse(p);
            return temp;
          } catch {
            return '';
          }
        }).filter((f: any) => f !== '');
    } else {
      try {
        const temp = jsonParse(value)
        params[key] = temp
      } catch {
        console.log('Have error when parser JSON')
      }
    }
  });
  
  return {params, fullPath};
}

export const createQuery = (params: any) => {
  Object.keys(params).forEach((key, index) => {
    if(params[key]) {
      params[key] = JSON.stringify(params[key]);
    } else {
      delete params[key]
    }
  });
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
}

export const escapeDoubleQuote = (params: any) => {
  Object.keys(params).forEach((key, index) => {
    if(params[key]) {
      params[key] = params[key].replace(/^"?(.+?)"?$/,'$1');
    } else {
      delete params[key]
    }
  });
  return params
}