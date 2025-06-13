import { callPrivateJsonApi } from "utils/api";
import { defaultLanguage, PAGE_SIZE } from "commons/config";

export const fetchRole= async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/role', {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailRole = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/role/${param}`, {}, activedLanguage)
}

export const addRole = async (param: any, activedLanguage = defaultLanguage) => {
  const { roleGroup: permissions , ...others } = param;
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/role`, 
    {...others, permissions}, 
    activedLanguage
  )
  return results
}

export const updateRole = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/role/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteRole = async (id: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi('DELETE', `/api/role/${id}`, {}, activedLanguage)
  return results
}

