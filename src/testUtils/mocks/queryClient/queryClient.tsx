import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";


export const QueryClientWrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };