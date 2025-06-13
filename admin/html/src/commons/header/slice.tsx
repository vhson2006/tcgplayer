import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRequesting: false,
  isError: false,
  meta: {
    title: 'meta.title',
    description: 'meta.description',
    socialImage: '',
  },
};

const local = createSlice({
  name: 'header',
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
    SET_META: (state: any, action: any) => {
      return {
        ...state,
        meta: action.payload
      };
    },
    GET_META: (state: any, action: PayloadAction<string>) => state,
  }
});

export const { reducer, actions } = local;

export default reducer;