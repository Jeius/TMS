"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children?: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: false } } });
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}
