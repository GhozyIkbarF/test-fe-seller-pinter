// import { create } from "zustand";
// import { getCookie, removeCookie } from "@/lib/utils";

// import { axiosInstance } from "@/lib/axios";

// interface AuthState {
//   data: any;
//   getUser: () => Promise<void>;
//   logoutHandler: () => Promise<void>;
// }

// const useAuthStore = create<AuthState>((set) => ({
//   data: null,
//   getUser: async () => {
//     try {
//       if (!getCookie()) return set({ data: null });

//       const response = await axiosInstance.get("/v1/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${getCookie()}`,
//         },
//       });

//       set({ data: response.data });
//     } catch (error) {
//       removeCookie();
//       window.location.href = "/";
//       set({ data: null });
//     }
//   },
//   logoutHandler: async () => {
//     window.location.href = "/";
//     removeCookie();
//     set({ data: null });
//   },
// }));

// export default useAuthStore;
