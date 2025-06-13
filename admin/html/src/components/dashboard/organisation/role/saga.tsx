import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addRole, deleteRole, detailRole, 
  fetchRole, updateRole 
} from 'components/dashboard/organisation/role/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/organisation/role/slice';
import notify from 'utils/notify';
import { actions as drawerActions } from "commons/drawers/slice";
import { ADD_ROLE_DRAWER } from './popups/AddDrawer';

function* fetchRoleList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.roleReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchRole, action.payload, activedLanguage)
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

function* fetchDetailRole(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.roleReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailRole, action.payload, activedLanguage)
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

function* createRole(action: PayloadAction<any>): any {
  const { params, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.roleReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addRole, others, activedLanguage)
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
      yield put(drawerActions.CLOSE_DRAWER(ADD_ROLE_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editRole(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.roleReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateRole, action.payload, activedLanguage)
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

function* removeRole(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.roleReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { id, params } = action.payload
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteRole, id, activedLanguage)
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
    }
  }
}

function* watchFetchRoleList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchRoleList);
  yield takeLeading(actions.GET_DETAIL_ASYNC, fetchDetailRole);
  yield takeLeading(actions.ADD_ASYNC, createRole);
  yield takeLeading(actions.UPDATE_ASYNC, editRole);
  yield takeLeading(actions.DELETE_ASYNC, removeRole);
}

export default watchFetchRoleList;