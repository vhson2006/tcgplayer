import { PayloadAction } from '@reduxjs/toolkit';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/profile/slice';
import { fetchOrder, getAccountInformation } from 'components/profile/api';
import { common, defaultLanguage } from 'commons/consts';
import notify from 'utils/notify';

function* fetchOrderList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.profile);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchOrder, action.payload, activedLanguage)
    console.log()
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

function* fetchDetailProfile(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.language);
  const { isRequesting } = yield select((state) => state?.profile);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(getAccountInformation, activedLanguage)
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


function* watchFetchOrderList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchOrderList);
  yield takeLeading(actions.GET_PROFILE_ASYNC, fetchDetailProfile);
}

export default watchFetchOrderList;
