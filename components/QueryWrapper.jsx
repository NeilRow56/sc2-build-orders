"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const QueryWrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <Toaster
      toastOptions={{
        // Define default options
        className: "bg-orange-500 text-white",
        duration: 5000,

        // Default options for specific types
        success: {
          className: "bg-green-500 text-white",
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
    {children}
  </QueryClientProvider>
);

export default QueryWrapper;
