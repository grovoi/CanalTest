import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import parametersReducer from '../features/parameters/parametersSlice'
import detailReducer from '../features/detail/detailSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    parameters: parametersReducer,
    detail: detailReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
