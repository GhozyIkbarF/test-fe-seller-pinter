"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}
export default Providers;
