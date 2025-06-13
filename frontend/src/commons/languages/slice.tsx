import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultLanguage } from 'commons/consts';

const initialState = {
  activedLanguage: defaultLanguage,
};

const local = createSlice({
  name: 'language',
  initialState,
  reducers: {
    SET_ACTIVED_LANGAUGE: (state: any, action: PayloadAction<string>) => {
      return {
        ...state,
        activedLanguage: action.payload
      };
    },
  }
});

export const { reducer, actions } = local;

export default reducer;