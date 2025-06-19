import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeCookie } from "@/lib/utils";
// import { axiosInstance } from "@/lib/axios";

export type IUserType = {
  id: string;
  username: string;
  role: string;
};

type authState = {
  data: IUserType;
};

const initialAuthState: authState = {
  data: {
    id: "",
    username: "",
    role: "",
  },
};

// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getUserProfile = createAsyncThunk(
//   "auth/getUserProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${getCookie()}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       removeCookie();
//       window.location.href = "/";
//       return rejectWithValue(initialAuthState.data);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "cart",
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserType>) => {
      state.data = action.payload;
    },
    logout(state) {
      removeCookie();
      window.location.href = "/auth/login";
      // state.data = initialAuthState.data;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUserProfile.fulfilled, (state, action) => {
  //     state.data = action.payload;
  //   });
  //   builder.addCase(getUserProfile.rejected, (state, action) => {
  //     state.data = initialAuthState.data;
  //   });
  // },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
