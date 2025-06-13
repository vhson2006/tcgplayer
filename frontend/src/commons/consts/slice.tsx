import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRequesting: false,
  isError: false,
  newsCategory: [],
  productCategory: [],
  productTag: [],
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
    SET_NEWS_CATEGORY: (state: any, action: any) => {
      return {
        ...state,
        newsCategory: action.payload,
      };
    },
    SET_PRODUCT_CATEGORY: (state: any, action: any) => {
      return {
        ...state,
        productCategory: action.payload,
      };
    },
    SET_PRODUCT_TAG: (state: any, action: any) => {
      return {
        ...state,
        productTag: action.payload,
      };
    },
    FETCH_NEWS_CATEGORY: (state: any) => state,
    FETCH_PRODUCT_CATEGORY: (state: any) => state,
    FETCH_PRODUCT_TAG: (state: any) => state,
  }
});

export const { reducer, actions } = common;

export default reducer;