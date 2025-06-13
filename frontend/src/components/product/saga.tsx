import { PayloadAction } from '@reduxjs/toolkit';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/product/slice';
import { detailProductBySlug, fetchProduct } from 'components/product/api';
import { common, defaultLanguage } from 'commons/consts';
import notify from 'utils/notify';

function* fetchProductList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.product);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchProduct, action.payload, activedLanguage)
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

function* fetchDetailbySlugProduct(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.product);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailProductBySlug, action.payload, activedLanguage)
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


function* watchFetchProductList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchProductList);
  yield takeLeading(actions.GET_DETAIL_BY_SLUG_ASYNC, fetchDetailbySlugProduct);
}

export default watchFetchProductList;
