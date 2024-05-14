import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./../features/user/slice/user_slice";
import petReducer from "../features/pets/slice/pets_slice.ts";
import bookingReducer from "../features/bookings/slice/bookings_slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reducers = combineReducers({
  user: userReducer,
  pet: petReducer,
  bookings: bookingReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
