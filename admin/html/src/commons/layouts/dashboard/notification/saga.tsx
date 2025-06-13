import { PayloadAction } from '@reduxjs/toolkit';
import { common } from 'commons/config';
import { call, put, select, takeLeading } from 'redux-saga/effects'; 
import { actions } from 'commons/layouts/dashboard/notification/slice';
import { fetchNotification } from './api';

function* fetchNotificationList(action: PayloadAction<any>): any {
    const { isRequesting } = yield select((state) => state?.notificationReducer);
   if(!isRequesting) {
    const response: any = yield call(fetchNotification, action.payload)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
    } else {
      yield put(actions.SET_LIST({
        list: response.data,
        total: response.total,
        page: response.page,
      }))
    }
   }
  
}

function* watchFetchNotificationList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchNotificationList);
}

export default watchFetchNotificationList;