import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRequesting: false,
  isError: false,
  profile: null,
};

const local = createSlice({
  name: 'account',
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
    SET_PROFILE: (state: any, action: any) => {
      return {
        ...state,
        profile: action.payload
      };
    },
    FETCH_PROFILE: (state: any) => state,
  }
});

export const { reducer, actions } = local;

export default reducer;