import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import "./index.css";
import Router from "./router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </QueryClientProvider>
  </StrictMode>
);
