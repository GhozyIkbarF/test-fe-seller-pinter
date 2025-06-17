import { configureStore } from "@reduxjs/toolkit"
import stateReducer from "./slices/counterSlice"
import authRucer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    state: stateReducer,
    auth: authRucer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
