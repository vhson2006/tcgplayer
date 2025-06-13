import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addCategory, deleteCategory, detailCategory, 
  fetchCategory, updateCategory 
} from 'components/dashboard/setting/category/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/setting/category/slice';
import notify from 'utils/notify';
import { ADD_CATEGORY_DRAWER } from './popups/AddDrawer';
import { actions as drawerActions } from "commons/drawers/slice";

function* fetchCategoryList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.categoryReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchCategory, action.payload, activedLanguage)
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

function* fetchDetailCategory(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.categoryReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailCategory, action.payload, activedLanguage)
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

function* createCategory(action: PayloadAction<any>): any {
  const { params, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.categoryReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addCategory, others, activedLanguage)
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
      yield put(drawerActions.CLOSE_DRAWER(ADD_CATEGORY_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editCategory(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.categoryReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateCategory, action.payload, activedLanguage)
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

function* removeCategory(action: PayloadAction<any>): any {
  const { id, params } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.categoryReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteCategory, id, activedLanguage)
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

function* watchFetchCategoryList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchCategoryList);
  yield takeLeading(actions.GET_DETAIL_ASYNC, fetchDetailCategory);
  yield takeLeading(actions.ADD_ASYNC, createCategory);
  yield takeLeading(actions.UPDATE_ASYNC, editCategory);
  yield takeLeading(actions.DELETE_ASYNC, removeCategory);
}

export default watchFetchCategoryList;