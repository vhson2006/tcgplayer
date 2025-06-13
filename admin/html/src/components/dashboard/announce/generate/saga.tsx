import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addGenerate, deleteGenerate, detailGenerate, 
  fetchGenerate, updateGenerate 
} from 'components/dashboard/announce/generate/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/announce/generate/slice';
import { actions as drawerActions } from "commons/drawers/slice";

import notify from 'utils/notify';
import { ADD_GENERATE_DRAWER } from './popups/AddDrawer';

function* fetchGenerateList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.generateReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchGenerate, action.payload, activedLanguage)
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

function* fetchDetailGenerate(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.generateReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailGenerate, action.payload, activedLanguage)
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

function* createGenerate(action: PayloadAction<any>): any {
  const { params, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.generateReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addGenerate, others, activedLanguage)
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
      yield put(drawerActions.CLOSE_DRAWER(ADD_GENERATE_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editGenerate(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.generateReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateGenerate, action.payload, activedLanguage)
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

function* removeGenerate(action: PayloadAction<any>): any {
  const { id, params } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.generateReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteGenerate, id, activedLanguage)
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

function* watchFetchGenerateList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchGenerateList);
  yield takeLeading(actions.GET_DETAIL_ASYNC, fetchDetailGenerate);
  yield takeLeading(actions.ADD_ASYNC, createGenerate);
  yield takeLeading(actions.UPDATE_ASYNC, editGenerate);
  yield takeLeading(actions.DELETE_ASYNC, removeGenerate);
}

export default watchFetchGenerateList;