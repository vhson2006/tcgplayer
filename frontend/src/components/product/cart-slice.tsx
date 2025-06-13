
import { createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCart, removeItemFromCart, resetCart, updateCart } from './api';

const initialState = () => {
  return {
    list: [],
  }
};

const slice = createSlice({
  name: 'cart',
  initialState: initialState(),
  reducers: {
    GET_LIST: (state, action) => {
      return {
        ...state,
        list: fetchCart(),
      };
    },
    UPDATE_LIST: (state, action) => {
      updateCart(action.payload)
      return {
        ...state,
        list: fetchCart(),
      };
    },
    ADD_ITEM: (state, action) => {
      addToCart(action.payload)
      return {
        ...state,
        list: fetchCart(),
      };
    },
    REMOVE_ITEM: (state, action) => {
      removeItemFromCart(action.payload)
      return {
        ...state,
        list: fetchCart(),
      };
    },
    RESET: (state, action) => {
      resetCart()
      return {
        ...state,
        list: [],
      };
    },
  },
});

export const { reducer, actions } = slice;

export default reducer;
