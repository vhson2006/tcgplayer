
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'profile',
  initialState: {
    isRequesting: false,
    isError: false,
    total: 0,
    order: [],
    detail: {},
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
        order: action.payload.list,
      };
    },
    SET_DETAIL: (state, action) => {
      return {
        ...state,
        detail: action.payload,
      };
    },
    GET_LIST_ASYNC: (state, action: PayloadAction<any>) => (state),
    GET_PROFILE_ASYNC: (state, action: PayloadAction<any>) => (state),
  },
});

export const { reducer, actions } = slice;

export default reducer;
