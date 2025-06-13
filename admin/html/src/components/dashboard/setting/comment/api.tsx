import { callPrivateJsonApi } from "utils/api";
import { common, defaultLanguage, PAGE_SIZE } from "commons/config";
import { wait } from "utils/array";

const module = 'comment'

export const fetchComment = async (param: any, activedLanguage = defaultLanguage) => {
  return await callPrivateJsonApi('GET', `/api/${module}`, {
    ...param, 
    size: PAGE_SIZE
  }, activedLanguage)
}
