import { callJsonApi } from "utils/fetch";
import { defaultLanguage } from ".";

export const getCategory = async (group: string, activedLanguage = defaultLanguage) => {
  return await callJsonApi('GET', '/api/public-category', {group}, activedLanguage)
}

export const getTag = async (group: string, activedLanguage = defaultLanguage) => {
  return await callJsonApi('GET', '/api/public-tag', {group}, activedLanguage)
}
