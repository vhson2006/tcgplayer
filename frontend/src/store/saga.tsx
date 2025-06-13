import { all } from "redux-saga/effects";
import commonSaga from "commons/consts/saga";
import newsSaga from 'components/news/saga';
import productSaga from 'components/product/saga';
import profileSaga from 'components/profile/saga';

const rootSaga = function* () {
  yield all([
    commonSaga(),
    productSaga(),
    newsSaga(),
    profileSaga(),
  ]);
};

export default rootSaga;
