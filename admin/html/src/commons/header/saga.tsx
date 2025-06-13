import { PayloadAction } from '@reduxjs/toolkit';
import { common } from 'commons/config';
import { takeLeading, call, put } from 'redux-saga/effects'; 
import { actions } from 'commons/header/slice';
import { getHelmetInformation } from './api';

function* fetchMetaInformation(action: PayloadAction<string>): any {
  const response: any = yield call(getHelmetInformation, action.payload)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_META(response.data))
  }
}

function* watchFetchMetaInformation() {
  yield takeLeading(actions.GET_META, fetchMetaInformation);
}

export default watchFetchMetaInformation;