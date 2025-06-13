import { defaultLanguage } from "commons/consts"
import { callJsonApi } from "utils/fetch"


export const fetchNews = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi("GET", "/api/public-news", param, activedLanguage)
}

export const detailNewsBySlug = async (param: any, activedLanguage = defaultLanguage) => {
  return await callJsonApi('GET', `/api/public-news/${param}`, {}, activedLanguage)
}