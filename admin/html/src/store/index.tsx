
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducer';
import rootSaga from './saga';
import monitorReducerEnhancer from '../store/enhancer';

const initialStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(logger).concat(sagaMiddleware),
    // middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
    enhancers: (getDefaultEnhancers: any) => getDefaultEnhancers().concat(monitorReducerEnhancer)
  })
  sagaMiddleware.run(rootSaga);

  return store;
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof initialStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default initialStore