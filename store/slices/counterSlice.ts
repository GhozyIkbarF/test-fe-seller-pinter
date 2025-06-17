import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CounterSlice = {
  titlePage?: string
  isOnPreview?: boolean
  dialogLogout: boolean
}

const initialState: CounterSlice = {
  titlePage: "Articles",
  isOnPreview: false,
  dialogLogout: false,
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
    setDialogLogout: (state, action: PayloadAction<boolean>) => {
          state.dialogLogout = action.payload;
        },
  },
})

export const { setTitle, setOnPreview, setDialogLogout} = counterSlice.actions
export default counterSlice.reducer
