import { defaultLanguage } from "commons/consts"
import { callJsonApi } from "utils/fetch"

export const loginCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('POST', '/api/customer-authentication/sign-in', param, activedLanguage)
}

export const registerCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('POST', '/api/customer-authentication/sign-up', param, activedLanguage)
}

export const activationCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('GET', '/api/customer-authentication/activate', param, activedLanguage)
}

export const forgotPasswordCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('POST', '/api/customer-authentication/forgot-password', param, activedLanguage)
}

export const resetPasswordCustomer = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('POST', '/api/customer-authentication/reset-password', param, activedLanguage)
}