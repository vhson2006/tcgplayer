import { callPrivateJsonApi } from "utils/api"
import { defaultLanguage, PAGE_SIZE } from "commons/config"

const module = 'customer'

const customer: any = [
  {
    id: 'customerId',
    name: 'My Name',
    phone: '+84 8715241 122',
    address: 'Welcome to our community',
  }
]
export const fetchCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}

export const detailCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}/${param}`, {}, activedLanguage)
}

export const addCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  const results = await callPrivateJsonApi(
    'POST', 
    `/api/${module}`, 
    param, 
    activedLanguage
  )
  return results
}

export const updateCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  const { id, ...others } = param;
  const results = await callPrivateJsonApi(
    'PATCH', 
    `/api/${module}/${id}`, 
    others, 
    activedLanguage
  )
  return results
}

export const deleteCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('DELETE', `/api/${module}/${param}`, {}, activedLanguage)
}