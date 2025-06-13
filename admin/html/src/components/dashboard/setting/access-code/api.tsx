import { callPrivateJsonApi } from "utils/api"
import { defaultLanguage, PAGE_SIZE } from "commons/config"

const module = 'access-code'

export const fetchAccessCode = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailAccessCode = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}/${param}`, {}, activedLanguage)
}

export const addAccessCode = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/${module}`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateAccessCode = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/${module}/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteAccessCode = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('DELETE', `/api/${module}/${param}`, {}, activedLanguage)
}