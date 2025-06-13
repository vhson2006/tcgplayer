import { PayloadAction } from '@reduxjs/toolkit';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/news/slice';
import { detailNewsBySlug, fetchNews } from 'components/news/api';
import { common, defaultLanguage } from 'commons/consts';
import notify from 'utils/notify';

function* fetchNewsList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.news);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchNews, action.payload, activedLanguage)
    if (response?.status === 0) {
      yield put(actions.IS_FAILED())
      if (response?.message) {
        notify.error(response?.message)
      } else {
        notify.error(activedLanguage === defaultLanguage ? 'Có lỗi' : "Something wrong")
      }
    } else {
      yield put(actions.SET_LIST({
        list: response?.data,
        total: response?.total,
      }))
      yield put(actions.IS_DONE());
    }
  }
}

function* fetchDetailbySlugNews(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.news);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailNewsBySlug, action.payload, activedLanguage)
    if (response?.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response?.message) {
        notify.error(response?.message)
      } else {
        notify.error(activedLanguage === defaultLanguage ? 'Có lỗi' : "Something wrong")
      }
    } else {
      yield put(actions.SET_DETAIL(response?.data))
      yield put(actions.IS_DONE());
    }
  }
}

function* watchFetchNewsList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchNewsList);
  yield takeLeading(actions.GET_DETAIL_BY_SLUG_ASYNC, fetchDetailbySlugNews);
}

export default watchFetchNewsList;
