import { all } from 'redux-saga/effects';
import commonSaga from 'commons/const/saga';
import headerSaga from 'commons/header/saga';
import notificationSaga from 'commons/layouts/dashboard/notification/saga';
import accountSaga from 'components/dashboard/account/saga';
import employeesSaga from 'components/dashboard/organisation/employee/saga';
import newsSaga from 'components/dashboard/announce/news/saga';
import tagSaga from 'components/dashboard/setting/tag/saga';
import categorySaga from 'components/dashboard/setting/category/saga';
import emailSaga from 'components/dashboard/setting/email/saga';
import mediaSaga from 'components/dashboard/setting/media/saga';
import accessCodeSaga from 'components/dashboard/setting/access-code/saga';
import commentSaga from 'components/dashboard/setting/comment/saga';
import roleSaga from 'components/dashboard/organisation/role/saga';
import generateSaga from 'components/dashboard/announce/generate/saga';
import productSaga from 'components/dashboard/business/product/saga';
import orderSaga from 'components/dashboard/business/order/saga';
import customerSaga from 'components/dashboard/customer/customer/saga';
import voucherSaga from 'components/dashboard/customer/voucher/saga';

export default function* rootSaga() {
  yield all([
    commonSaga(),
    headerSaga(),
    notificationSaga(),
    accountSaga(),
    employeesSaga(),
    newsSaga(),
    tagSaga(),
    categorySaga(),
    emailSaga(),
    mediaSaga(),
    accessCodeSaga(),
    commentSaga(),
    roleSaga(),
    generateSaga(),
    productSaga(),
    orderSaga(),
    customerSaga(),
    voucherSaga(),
  ]);
}
