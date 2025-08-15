import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";
import ErrorToast from "./components/common/toast/ErrorToast";
import { Suspense } from "react";

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
      <BrowserRouter>
        <Suspense fallback={<div>로딩중..................</div>}>
          <Router />
        </Suspense>
        <Toast />
        <ErrorToast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
