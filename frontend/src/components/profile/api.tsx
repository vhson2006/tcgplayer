import { defaultLanguage } from "commons/consts"
import { callPrivateJsonApi } from "utils/fetch"

export const fetchOrder = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi("GET", "/api/public-order", param, activedLanguage)
}

export const getAccountInformation = async (activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/public-customer`, {}, activedLanguage)
}

export const updateAccountInformation = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('PATCH', `/api/public-customer`, param, activedLanguage)
}