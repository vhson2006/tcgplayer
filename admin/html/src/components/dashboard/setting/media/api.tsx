import { callPrivateJsonApi } from "utils/api"
import { defaultLanguage, PAGE_SIZE } from "commons/config"

const module = 'media'

export const fetchMedia = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailMedia = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}/${param}`, {}, activedLanguage)
}

export const addMedia = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/${module}`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateMedia = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/${module}/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteMedia = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('DELETE', `/api/${module}/${param}`, {}, activedLanguage)
}