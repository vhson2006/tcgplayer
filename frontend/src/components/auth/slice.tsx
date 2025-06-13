import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { decryptPermission } from 'utils/account';

const init = () => {
  try {
    if (localStorage.getItem('permission')) {
      return decryptPermission(localStorage.getItem('permission') || '')
    }
    return {}
  } catch (e) {
    return {}
  }
}

const initialState = {
  isRequesting: false,
  isError: false,
  permission: init(),
};

const local = createSlice({
  name: 'authentication',
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
    SET_PERMISSION: (state: any, action: any) => {
      return {
        ...state,
        permission: action.payload
      };
    },
  }
});

export const { reducer, actions } = local;

export default reducer;