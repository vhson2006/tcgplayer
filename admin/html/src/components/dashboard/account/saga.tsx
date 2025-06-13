import { common } from 'commons/config';
import { takeLeading, call, put } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/account/slice';
import { fetchProfile } from './api';

function* getProfile(): any {
  const response: any = yield call(fetchProfile)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PROFILE(response.data))
  }
}

function* watchFetchMetaInformation() {
  yield takeLeading(actions.FETCH_PROFILE, getProfile);
}

export default watchFetchMetaInformation;