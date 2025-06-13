import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRequesting: false,
  isError: false,
  employeeRoles: [],
  employeeStatuses: [],
  tagGroups: [],
  categoryGroups: [],
  newsCategory: [],
  newsTag: [],
  emailType: [],
  accessCodeType: [],
  accessCodeStatus: [],
  commentStatus: [],
  permissions: [],
  generateStatus: [],
  productCategory: [],
  productStatus: [],
  productTag: [],
  productType: [],
  orderStatus: [],
  paymentStatus: [],
  paymentType: [],
  voucherType: [],
  conditionType: [],
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    IS_LOADING: (state: any) => {
      return {
        ...state,
        isRequesting: true,
        isError: false,
      };
    },
    IS_DONE: (state: any) => {
      return {
        ...state,
        isRequesting: false,
        isError: false,
      };
    },
    IS_FAILED: (state: any) => {
      return {
        ...state,
        isRequesting: false,
        isError: true,
      };
    },
    SET_EMPLOYEE_ROLES: (state: any, action: any) => {
      return {
        ...state,
        employeeRoles: action.payload,
      };
    },
    SET_EMPLOYEE_STATUSES: (state: any, action: any) => {
      return {
        ...state,
        employeeStatuses: action.payload,
      };
    },
    SET_TAG_GROUPS: (state: any, action: any) => {
      return {
        ...state,
        tagGroups: action.payload,
      };
    },
    SET_CATEGORY_GROUPS: (state: any, action: any) => {
      return {
        ...state,
        categoryGroups: action.payload,
      };
    },
    SET_NEWS_CATEGORY: (state: any, action: any) => {
      return {
        ...state,
        newsCategory: action.payload,
      };
    },
    SET_NEWS_TAG: (state: any, action: any) => {
      return {
        ...state,
        newsTag: action.payload,
      };
    },
    SET_EMAIL_TYPE: (state: any, action: any) => {
      return {
        ...state,
        emailType: action.payload,
      };
    },
    SET_ACCESS_CODE_TYPE: (state: any, action: any) => {
      return {
        ...state,
        accessCodeType: action.payload,
      };
    },
    SET_ACCESS_CODE_STATUS: (state: any, action: any) => {
      return {
        ...state,
        accessCodeStatus: action.payload,
      };
    },
    SET_COMMENT_STATUS: (state: any, action: any) => {
      return {
        ...state,
        commentStatus: action.payload,
      };
    },
    SET_PERMISSIONS: (state: any, action: any) => {
      return {
        ...state,
        permissions: action.payload,
      };
    },
    SET_GENERATE_STATUS: (state: any, action: any) => {
      return {
        ...state,
        generateStatus: action.payload,
      };
    },
    SET_PRODUCT_CATEGORY: (state: any, action: any) => {
      return {
        ...state,
        productCategory: action.payload,
      };
    },
    SET_PRODUCT_STATUS: (state: any, action: any) => {
      return {
        ...state,
        productStatus: action.payload,
      };
    },
    SET_PRODUCT_TAG: (state: any, action: any) => {
      return {
        ...state,
        productTag: action.payload,
      };
    },
    SET_PRODUCT_TYPE: (state: any, action: any) => {
      return {
        ...state,
        productType: action.payload,
      };
    },
    SET_ORDER_STATUS: (state: any, action: any) => {
      return {
        ...state,
        orderStatus: action.payload,
      };
    },
    SET_PAYMENT_STATUS: (state: any, action: any) => {
      return {
        ...state,
        paymentStatus: action.payload,
      };
    },
    SET_PAYMENT_TYPE: (state: any, action: any) => {
      return {
        ...state,
        paymentType: action.payload,
      };
    },
    SET_VOUCHER_TYPE: (state: any, action: any) => {
      return {
        ...state,
        voucherType: action.payload,
      };
    },
    SET_CONDITION_TYPE: (state: any, action: any) => {
      return {
        ...state,
        conditionType: action.payload,
      };
    },
    FETCH_EMPLOYEE_ROLES: (state: any) => state,
    FETCH_EMPLOYEE_STATUSES: (state: any) => state,
    FETCH_TAG_GROUPS: (state: any) => state,
    FETCH_CATEGORY_GROUPS: (state: any) => state,
    FETCH_NEWS_CATEGORY: (state: any) => state,
    FETCH_NEWS_TAG: (state: any) => state,
    FETCH_EMAIL_TYPE: (state: any) => state,
    FETCH_ACCESS_CODE_TYPE: (state: any) => state,
    FETCH_ACCESS_CODE_STATUS: (state: any) => state,
    FETCH_COMMENT_STATUS: (state: any) => state,
    FETCH_PERMISSIONS: (state: any) => state,
    FETCH_GENERATE_STATUS: (state: any) => state,
    FETCH_PRODUCT_CATEGORY: (state: any) => state,
    FETCH_PRODUCT_STATUS: (state: any) => state,
    FETCH_PRODUCT_TAG: (state: any) => state,
    FETCH_PRODUCT_TYPE: (state: any) => state,
    FETCH_ORDER_STATUS: (state: any) => state,
    FETCH_PAYMENT_STATUS: (state: any) => state,
    FETCH_PAYMENT_TYPE: (state: any) => state,
    FETCH_CONDITION_TYPE: (state: any) => state,
    FETCH_VOUCHER_TYPE: (state: any) => state,
  }
});

export const { reducer, actions } = common;

export default reducer;