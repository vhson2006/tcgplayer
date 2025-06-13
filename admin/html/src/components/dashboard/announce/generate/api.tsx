import { callPrivateJsonApi } from "utils/api";
import { defaultLanguage, PAGE_SIZE } from "commons/config";

const module = 'generate'
export const fetchGenerate = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailGenerate = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}/${param}`, {}, activedLanguage)
}

export const addGenerate = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/${module}`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateGenerate = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/${module}/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteGenerate = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('DELETE', `/api/${module}/${param}`, {}, activedLanguage)
}
