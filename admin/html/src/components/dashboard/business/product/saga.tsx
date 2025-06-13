import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addProduct, deleteProduct, detailProductBySlug, fetchProduct, updateProduct 
} from 'components/dashboard/business/product/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/business/product/slice';
import notify from 'utils/notify';
import { ADD_PRODUCT_DRAWER } from './popups/AddDrawer';
import { actions as drawerActions } from "commons/drawers/slice";

function* fetchProductList(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.productReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchProduct, action.payload, activedLanguage)
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

function* fetchDetailbySlugProduct(action: PayloadAction<any>): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.productReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailProductBySlug, action.payload, activedLanguage)
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

function* createProduct(action: PayloadAction<any>): any {
  const { params, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.productReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addProduct, others, activedLanguage)
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
      yield put(drawerActions.CLOSE_DRAWER(ADD_PRODUCT_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editProduct(action: PayloadAction<any>): any {
  const { slug, ...others } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.productReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateProduct, others, activedLanguage)
    if (response.status === common.INCORRECT) {
      yield put(actions.IS_FAILED())
      if (response.message) {
        notify.error(response.message)
      } else {
        notify.error(t('message.error'))
      }
    } else {
      yield put(actions.IS_DONE());
      yield put(actions.GET_DETAIL_BY_SLUG_ASYNC(slug));
      notify.success(t('message.success'))
    }
  }
}

function* removeProduct(action: PayloadAction<any>): any {
  const { id, params } = action.payload
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { isRequesting } = yield select((state) => state?.productReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteProduct, id, activedLanguage)
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

function* watchFetchProductList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchProductList);
  yield takeLeading(actions.GET_DETAIL_BY_SLUG_ASYNC, fetchDetailbySlugProduct);
  yield takeLeading(actions.ADD_ASYNC, createProduct);
  yield takeLeading(actions.UPDATE_ASYNC, editProduct);
  yield takeLeading(actions.DELETE_ASYNC, removeProduct);
}

export default watchFetchProductList;