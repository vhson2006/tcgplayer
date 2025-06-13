import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { uniqueArray } from 'utils/array';
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
    PUSH_SELECTED: (state, action) => {
      const { id, value } = action.payload
      if (value === false) {
        return {
          ...state,
          selected: current(state).selected.filter((s: any) => s !== id)
        }; 
      } else {
        return {
          ...state,
          selected: uniqueArray([
            ...current(state).selected,
            id
          ])
        };
      }
    },
    GET_LIST_ASYNC: (state, action: PayloadAction<any>) => (state),
    GET_DETAIL_BY_SLUG_ASYNC: (state, action: PayloadAction<any>) => (state),
    ADD_ASYNC: (state, action: PayloadAction<any>) => (state),
    UPDATE_ASYNC: (state, action: PayloadAction<any>) => (state),
    DELETE_ASYNC: (state, action: PayloadAction<any>) => (state),
    MASS_CHANGE_ASYNC: (state, action: PayloadAction<any>) => (state),
  },
});

export const { reducer, actions } = slice;

export default reducer;
