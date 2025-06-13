import { defaultLanguage } from "commons/config";
import { callPrivateJsonApi } from "utils/api";

export const getPermissions = async (activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/permission', {}, activedLanguage)
}

export const getRoles = async (activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/role', {}, activedLanguage)
}

export const getGeneral = async (group: string, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/common', {group}, activedLanguage)
}

export const getCategory = async (group: string, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/category', {group}, activedLanguage)
}

export const getTag = async (group: string, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', '/api/tag', {group}, activedLanguage)
}