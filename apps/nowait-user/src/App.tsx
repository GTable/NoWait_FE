import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";
import ErrorToast from "./components/common/toast/ErrorToast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { NavermapsProvider } from "react-naver-maps";
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
      {/* <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAP_KEY}> */}
        <SpeedInsights />
        <BrowserRouter>
          <Router />
          <Toast />
          <ErrorToast />
        </BrowserRouter>
      {/* </NavermapsProvider> */}
    </QueryClientProvider>
  );
}

export default App;
