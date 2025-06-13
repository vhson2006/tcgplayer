import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { ReduxAction } from "typescripts/common";
import language from "commons/languages/slice";
import common from "commons/consts/slice";
import authentication from "components/auth/slice";
import drawers from "commons/drawers/slice";
import modals from "commons/modals/slice";
import product from "components/product/slice";
import cart from 'components/product/cart-slice';
import news  from 'components/news/slice';
import profile  from 'components/profile/slice';

export const SET_IS_SERVER = "SET_IS_SERVER";

// this is to set a flag for initial server renders
function serverCheck(state = { isServer: false }, action: ReduxAction) {
  const { type } = action;
  switch (type) {
    case SET_IS_SERVER: {
      return { ...state, isServer: true };
    }
    default:
      return state;
  }
}

//We hydrate only if this is the initial server render
function hydrate(state = {}, action: ReduxAction) {
  const { type } = action;
  switch (type) {
    case HYDRATE: {
      if (action.payload.serverCheck.isServer) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  serverCheck,
  language,
  common,
  authentication,
  drawers,
  modals,
  product,
  cart,
  news,
  profile,
});

function rootReducer(state: any, action: ReduxAction) {
  const intermediateState = combinedReducer(state, action);
  return hydrate(intermediateState, action);
}
export default rootReducer;
