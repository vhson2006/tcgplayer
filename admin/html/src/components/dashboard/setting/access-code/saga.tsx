import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addAccessCode, deleteAccessCode, detailAccessCode, 
  fetchAccessCode, updateAccessCode 
} from 'components/dashboard/setting/access-code/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/setting/access-code/slice';
import notify from 'utils/notify';
import { ADD_ACCESS_CODE_DRAWER } from './popups/AddDrawer';
import { actions as drawerActions } from "commons/drawers/slice";

function* fetchAccessCodeList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.accessCodeReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchAccessCode, action.payload, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.SET_LIST({
        list: response.data,
        total: response.total,
      }))
      yield put(actions.IS_DONE());
    }
  }
}

function* fetchDetailAccessCode(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.accessCodeReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailAccessCode, action.payload, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.SET_DETAIL(response.data))
      yield put(actions.IS_DONE());
    }
  }
}

function* createAccessCode(action: PayloadAction<any>): any {
  const { params, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.accessCodeReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addAccessCode, others, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.IS_DONE());
      yield put(actions.GET_LIST_ASYNC(params));
      notify.success(t('message.success'));
      yield put(drawerActions.CLOSE_DRAWER(ADD_ACCESS_CODE_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editAccessCode(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.accessCodeReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateAccessCode, action.payload, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.IS_DONE());
      yield put(actions.GET_DETAIL_ASYNC(action.payload.id));
      notify.success(t('message.success'))
    }
  }
}

function* removeAccessCode(action: PayloadAction<any>): any {
  const { id, params } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.accessCodeReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteAccessCode, id, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.IS_DONE());
      yield put(actions.GET_LIST_ASYNC(params));
      notify.success(t('message.success'))
    }
  }
}

function* watchFetchAccessCodeList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchAccessCodeList);
  yield takeLeading(actions.GET_DETAIL_ASYNC, fetchDetailAccessCode);
  yield takeLeading(actions.ADD_ASYNC, createAccessCode);
  yield takeLeading(actions.UPDATE_ASYNC, editAccessCode);
  yield takeLeading(actions.DELETE_ASYNC, removeAccessCode);
}

export default watchFetchAccessCodeList;