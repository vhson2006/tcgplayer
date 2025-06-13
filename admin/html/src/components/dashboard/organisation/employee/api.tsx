import { callPrivateJsonApi } from "utils/api";
import { defaultLanguage, PAGE_SIZE } from "commons/config";

export const fetchEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/employee', {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/employee/${param}`, {}, activedLanguage)
}

export const addEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  const { cmnd: identified , ...others } = param;
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/employee`, 
    {...others, identified}, 
    activedLanguage
  )
  return results
}

export const updateEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, cmnd: identified , ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/employee/${id}`, 
    { ...others, identified }, 
    activedLanguage
  )
  return results
}

export const deleteEmployee = async (id: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi('DELETE', `/api/employee/${id}`, {}, activedLanguage)
  return results
}

export const massUpdateEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/employee/mass-change-status`, 
    param, 
    activedLanguage
  )
  return results
}

export const importEmployee = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/employee/import`, 
    param, 
    activedLanguage
  )
  return results
}
