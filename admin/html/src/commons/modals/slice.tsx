import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  modal: [],
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    OPEN_MODAL: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        modal: [
          ...current(state).modal,
          action.payload
        ]
      };
    },
    CLOSE_MODAL: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        modal: current(state).modal.filter((m: any) => m.type !== action.payload)
      };
    },
    CLOSE_ALL_MODAL: (state: any) => {
      return {
        ...state,
        modal: []
      };
    },
  }
});

export const { reducer, actions } = modal;

export default reducer;