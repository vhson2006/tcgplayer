import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notifications',
  initialState: {
    isRequesting: false,
    isError: false,
    total: 0,
    page: 0,
    list: [],
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
    SET_LIST: (state: any, action) => {
      return {
        ...state,
        total: action.payload.total,
        list: [...current(state.list), ...action.payload.list],
        page: action.payload.page,
      };
    },
    GET_LIST_ASYNC: (state, action: PayloadAction<any>) => (state),
  },
});

export const { reducer, actions } = slice;

export default reducer;
