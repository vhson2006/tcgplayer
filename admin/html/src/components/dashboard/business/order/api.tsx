import { callPrivateJsonApi } from "utils/api"
import { defaultLanguage, PAGE_SIZE } from "commons/config"

const module = 'order'

export const fetchOrder = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailOrder = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}/${param}`, {}, activedLanguage)
}

export const addOrder = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/${module}`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateOrder = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/${module}/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteOrder = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('DELETE', `/api/${module}/${param}`, {}, activedLanguage)
}
