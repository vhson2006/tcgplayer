import { common } from 'commons/consts';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'commons/consts/slice';
import { jsonParse } from "utils/json";
import { getCategory, getTag } from './api';
import { CATEGORY, TAG } from './config';

function* fetchNewsCategory(): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const response: any = yield call(getCategory, CATEGORY.NEWS, activedLanguage);
  if (response?.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_NEWS_CATEGORY(response?.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
    }))))
  }
}

function* fetchProductCategory(): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const response: any = yield call(getCategory, CATEGORY.PRODUCT, activedLanguage)
  if (response?.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_CATEGORY(response?.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
    }))))
  }
}

function* fetchProductTag(): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const response: any = yield call(getTag, TAG.PRODUCT, activedLanguage)
  if (response?.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_TAG(response?.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
    }))))
  }
}


function* watchFetchCommon() {
  yield takeLeading(actions.FETCH_NEWS_CATEGORY, fetchNewsCategory);
  yield takeLeading(actions.FETCH_PRODUCT_CATEGORY, fetchProductCategory);
  yield takeLeading(actions.FETCH_PRODUCT_TAG, fetchProductTag);
}

export default watchFetchCommon;