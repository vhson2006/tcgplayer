import { PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchEmployee, deleteEmployee, detailEmployee, 
  addEmployee, updateEmployee, massUpdateEmployee 
} from 'components/dashboard/organisation/employee/api';
import { common } from 'commons/config';
import { t } from 'commons/languages/helper';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'components/dashboard/organisation/employee/slice';
import { actions as drawerActions } from "commons/drawers/slice";
import notify from 'utils/notify';
import { ADD_EMPLOYEE_DRAWER } from './popups/AddEmployeeDrawer';

function* fetchEmployeeList(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(fetchEmployee, action.payload, activedLanguage)
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

function* fetchDetailEmployee(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(detailEmployee, action.payload, activedLanguage)
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

function* createEmployee(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { params, ...others } = action.payload
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(addEmployee, others, activedLanguage)
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
      yield put(drawerActions.CLOSE_DRAWER(ADD_EMPLOYEE_DRAWER))
    }
  } else {
    notify.warning(t('message.warning.busy'))
  }
}

function* editEmployee(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(updateEmployee, action.payload, activedLanguage)
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

function* removeEmployee(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { id, params } = action.payload
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(deleteEmployee, id, activedLanguage)
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

function* massChangeEmployee(action: PayloadAction<any>): any {
  const { isRequesting } = yield select((state) => state?.employeesReducer);
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const { params, ...others } = action.payload
  if (!isRequesting) {
    yield put(actions.IS_LOADING());
    const response: any = yield call(massUpdateEmployee, others, activedLanguage)
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

function* watchFetchEmployeeList() {
  yield takeLeading(actions.GET_LIST_ASYNC, fetchEmployeeList);
  yield takeLeading(actions.GET_DETAIL_ASYNC, fetchDetailEmployee);
  yield takeLeading(actions.ADD_ASYNC, createEmployee);
  yield takeLeading(actions.UPDATE_ASYNC, editEmployee);
  yield takeLeading(actions.DELETE_ASYNC, removeEmployee);
  yield takeLeading(actions.MASS_CHANGE_ASYNC, massChangeEmployee);
}

export default watchFetchEmployeeList;