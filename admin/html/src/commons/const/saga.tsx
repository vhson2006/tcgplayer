import { common } from 'commons/config';
import { ACCESS_CODE_STATUS, ACCESS_CODE_TYPE, CATEGORY, COMMENT_STATUS, EMAIL_TYPE, EMPLOYEE_STATUS, GENERATE_STATUS, ORDER_STATUS, PAYMENT_STATUS, PAYMENT_TYPE, PRODUCT_STATUS, PRODUCT_TYPE, TAG, VOUCHER_CONDITION, VOUCHER_TYPE } from 'commons/const';
import { takeLeading, call, put, select } from 'redux-saga/effects'; 
import { actions } from 'commons/const/slice';
import { jsonParse } from "utils/json";
import { getRoles, getGeneral, getCategory, getTag, getPermissions } from './api';

function* fetchEmployeeRoles(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getRoles, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_EMPLOYEE_ROLES(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      // icon: d.icon,
    }))))
  }
}

function* fetchEmployeeStatuses(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, EMPLOYEE_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_EMPLOYEE_STATUSES(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      // icon: d.icon,
    }))))
  }
}

function* fetchTagGroups(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, TAG.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_TAG_GROUPS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchCategoryGroups(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, CATEGORY.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_CATEGORY_GROUPS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchNewsCategory(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getCategory, CATEGORY.NEWS, activedLanguage);
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_NEWS_CATEGORY(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchNewsTag(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getTag, TAG.NEWS, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_NEWS_TAG(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchEmailType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, EMAIL_TYPE.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_EMAIL_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchAccessCodeType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, ACCESS_CODE_TYPE.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_ACCESS_CODE_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchAccessCodeStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, ACCESS_CODE_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_ACCESS_CODE_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchCommentStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, COMMENT_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_COMMENT_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchPermissions(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getPermissions)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PERMISSIONS(response.data.map((d: any) => ({
      value: `${d.type} - ${d.group}`,
      label: `${jsonParse(d.typeName)[activedLanguage]} - ${jsonParse(d.groupName)[activedLanguage]}`,
      // icon: d.icon,
    }))))
  }
}

function* fetchGenerateStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, GENERATE_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_GENERATE_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchProductCategory(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getCategory, CATEGORY.PRODUCT, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_CATEGORY(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchProductStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, PRODUCT_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchProductTag(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getTag, TAG.PRODUCT, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_TAG(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchProductType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, PRODUCT_TYPE.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PRODUCT_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchOrderStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, ORDER_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_ORDER_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchPaymentStatus(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, PAYMENT_STATUS.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PAYMENT_STATUS(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchPaymentType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, PAYMENT_TYPE.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_PAYMENT_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchVoucherType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, VOUCHER_TYPE.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_VOUCHER_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* fetchConditionType(): any {
  const { activedLanguage } = yield select((state) => state?.languageReducer);
  const response: any = yield call(getGeneral, VOUCHER_CONDITION.GROUP, activedLanguage)
  if (response.status === common.INCORRECT) {
    yield put(actions.IS_FAILED())
  } else {
    yield put(actions.SET_CONDITION_TYPE(response.data.map((d: any) => ({
      value: d.type,
      label: jsonParse(d.typeName)[activedLanguage],
      icon: d.icon,
    }))))
  }
}

function* watchFetchCommon() {
  yield takeLeading(actions.FETCH_EMPLOYEE_ROLES, fetchEmployeeRoles);
  yield takeLeading(actions.FETCH_EMPLOYEE_STATUSES, fetchEmployeeStatuses);
  yield takeLeading(actions.FETCH_TAG_GROUPS, fetchTagGroups);
  yield takeLeading(actions.FETCH_CATEGORY_GROUPS, fetchCategoryGroups);
  yield takeLeading(actions.FETCH_NEWS_CATEGORY, fetchNewsCategory);
  yield takeLeading(actions.FETCH_NEWS_TAG, fetchNewsTag);
  yield takeLeading(actions.FETCH_EMAIL_TYPE, fetchEmailType);
  yield takeLeading(actions.FETCH_ACCESS_CODE_TYPE, fetchAccessCodeType);
  yield takeLeading(actions.FETCH_ACCESS_CODE_STATUS, fetchAccessCodeStatus);
  yield takeLeading(actions.FETCH_COMMENT_STATUS, fetchCommentStatus);
  yield takeLeading(actions.FETCH_PERMISSIONS, fetchPermissions);
  yield takeLeading(actions.FETCH_GENERATE_STATUS, fetchGenerateStatus);
  yield takeLeading(actions.FETCH_PRODUCT_CATEGORY, fetchProductCategory);
  yield takeLeading(actions.FETCH_PRODUCT_STATUS, fetchProductStatus);
  yield takeLeading(actions.FETCH_PRODUCT_TAG, fetchProductTag);
  yield takeLeading(actions.FETCH_PRODUCT_TYPE, fetchProductType);
  yield takeLeading(actions.FETCH_ORDER_STATUS, fetchOrderStatus);
  yield takeLeading(actions.FETCH_PAYMENT_STATUS, fetchPaymentStatus);
  yield takeLeading(actions.FETCH_PAYMENT_TYPE, fetchPaymentType);
  yield takeLeading(actions.FETCH_CONDITION_TYPE, fetchConditionType);
  yield takeLeading(actions.FETCH_VOUCHER_TYPE, fetchVoucherType);
}

export default watchFetchCommon;