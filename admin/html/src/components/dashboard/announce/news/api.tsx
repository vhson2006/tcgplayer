import { callPrivateJsonApi } from "utils/api";
import { defaultLanguage, PAGE_SIZE } from "commons/config";

export const fetchNews = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/news', {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailNewsBySlug = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/news/${param}`, {}, activedLanguage)
}

export const addNews = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/news`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateNews = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/news/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteNews = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi('DELETE', `/api/news/${param}`, {}, activedLanguage)
  return results
}
