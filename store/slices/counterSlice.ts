import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { set } from "date-fns"


type CounterSlice = {
  titlePage?: string
  isOnPreview?: boolean
}

const initialState: CounterSlice = {
  titlePage: "Articles",
  isOnPreview: false,
}

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.titlePage = action.payload
    },
    setOnPreview(state, action: PayloadAction<boolean>) {
      state.isOnPreview = action.payload
    },
  },
})

export const { setTitle, setOnPreview} = counterSlice.actions
export default counterSlice.reducer
