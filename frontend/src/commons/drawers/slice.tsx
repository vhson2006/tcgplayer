import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { sizes } from 'commons/consts';

const initialState = {
  drawer: [],
};

const modal = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    OPEN_DRAWER: (state: any, action: PayloadAction<any>) => {      
      return {
        ...state,
        drawer: [ ...current(state).drawer, action.payload]
          .map((n: any) => ({...n, size: n.size ? n.size : 'xs'}))
          .reverse()
          .reduce((pre: any, cur: any) => {
            if(pre.length < 1) {
              pre.push(cur)
              return pre
            }
            const preSizeIndex = sizes.findIndex((s: any) => s === pre[pre.length -1].size)
            let curSizeIndex = sizes.findIndex((s: any) => s === cur.size)
            if (curSizeIndex <= preSizeIndex) {
              curSizeIndex = preSizeIndex + 1
            } 
            if (curSizeIndex > sizes.length - 1) {
              curSizeIndex = sizes.length
            }

            const newCur = {
              ...cur,
              size: sizes[curSizeIndex]
            }
            
            return [
              ...pre,
              newCur
            ]
          }, [])
          .reverse()
      };
    },
    CLOSE_DRAWER: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        drawer: current(state).drawer.filter((m: any) => m.type !== action.payload)
      };
    },
    CLOSE_ALL_DRAWER: (state: any) => {
      return {
        ...state,
        drawer: [],
      };
    },
  }
});

export const { reducer, actions } = modal;

export default reducer;