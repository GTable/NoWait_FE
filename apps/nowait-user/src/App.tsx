import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";
import ErrorToast from "./components/common/toast/ErrorToast";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SpeedInsights />
      <BrowserRouter>
        <Router />
        <Toast />
        <ErrorToast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
