
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'news',
  initialState: {
    isRequesting: false,
    isError: false,
    total: 0,
    list: [],
    detail: {},
    selected: [],
  },
  reducers: {
    IS_LOADING: (state) => {
      return {
        ...state,
        isRequesting: true,
        isError: false,
      };
    },
    IS_DONE: (state) => {
      return {
        ...state,
        isRequesting: false,
        isError: false,
      };
    },
    IS_FAILED: (state) => {
      return {
        ...state,
        isRequesting: false,
        isError: true,
      };
    },
    SET_LIST: (state, action) => {
      return {
        ...state,
        total: action.payload.total,
        list: action.payload.list,
      };
    },
    SET_DETAIL: (state, action) => {
      return {
        ...state,
        detail: action.payload,
      };
    },
    GET_LIST_ASYNC: (state, action: PayloadAction<any>) => (state),
    GET_DETAIL_BY_SLUG_ASYNC: (state, action: PayloadAction<any>) => (state),
  },
});

export const { reducer, actions } = slice;

export default reducer;
