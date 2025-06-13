import { combineReducers } from 'redux';
import commonReducer from 'commons/const/slice';
import drawerReducer from 'commons/drawers/slice';
import headerReducer from 'commons/header/slice';
import languageReducer from 'commons/languages/slice';
import notificationReducer from 'commons/layouts/dashboard/notification/slice';
import modalReducer from 'commons/modals/slice';
import authenticationReducer from 'components/authentication/slice';
import accountReducer from 'components/dashboard/account/slice';
import employeesReducer from 'components/dashboard/organisation/employee/slice';
import newsReducer from 'components/dashboard/announce/news/slice';
import tagReducer from 'components/dashboard/setting/tag/slice';
import categoryReducer from 'components/dashboard/setting/category/slice';
import emailReducer from 'components/dashboard/setting/email/slice';
import mediaReducer from 'components/dashboard/setting/media/slice';
import accessCodeReducer from 'components/dashboard/setting/access-code/slice';
import commentReducer from 'components/dashboard/setting/comment/slice';
import roleReducer from 'components/dashboard/organisation/role/slice';
import generateReducer from 'components/dashboard/announce/generate/slice';
import productReducer from 'components/dashboard/business/product/slice';
import orderReducer from 'components/dashboard/business/order/slice';
import customerReducer from 'components/dashboard/customer/customer/slice';
import voucherReducer from 'components/dashboard/customer/voucher/slice';

const rootReducer = combineReducers({
  commonReducer,
  drawerReducer,
  headerReducer,
  languageReducer,
  notificationReducer,
  modalReducer,
  authenticationReducer,
  accountReducer,
  employeesReducer,
  newsReducer,
  tagReducer,
  categoryReducer,
  emailReducer,
  mediaReducer,
  accessCodeReducer,
  commentReducer,
  roleReducer,
  generateReducer,
  productReducer,
  orderReducer,
  customerReducer,
  voucherReducer,
});

export default rootReducer;
