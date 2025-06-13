import { defaultLanguage } from 'commons/consts';
import { actions as commonActions } from 'commons/consts/slice';
import { actions as languageActions } from 'commons/languages/slice';

export const initialFetch = (dispatch: any, extra: any = [], locale = null) => {
  try {
    if (locale) {
      dispatch(languageActions.SET_ACTIVED_LANGAUGE(locale));
    } 
    dispatch(commonActions.FETCH_NEWS_CATEGORY());
    dispatch(commonActions.FETCH_PRODUCT_CATEGORY());
    if (Array.isArray(extra) && extra.length > 0) {
      extra.forEach((e: any) => dispatch(e));
    }
  } catch(e) {
    console.log(e);
  }
}