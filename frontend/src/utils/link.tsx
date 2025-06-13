import { supportLanguages, defaultLanguage } from "commons/consts";
import { useRouter } from "next/router";
import { serialize } from "utils/object";
import { jsonParse } from "./json";

export const makeUrlFromPath = (url: string, location: any) => {
  const path = location.pathname.split('/').filter((e: any) => e);
  if (Array.isArray(path) && path.length > 0 && Object.keys(supportLanguages).includes(path[0])) {
    return `/${path[0]}${url}`
  } else {
    return url
  }
}

export const makeUrl = (url: string, lang: string) => {
  if (!Object.keys(supportLanguages).includes(lang)) {
    return url
  }
  return lang === defaultLanguage ? url : `/${lang}${url}`
}

export const usePath = () => {
  const location = useRouter();
  const fullPath = `${location.pathname}?${serialize(location.query)}`;
  const searchParams = new URLSearchParams(serialize(location.query));

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
        const temp = jsonParse(value);
        params[key] = temp;
      } catch {
        console.log(`Have error when parser JSON ${key}: ${value}`)
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