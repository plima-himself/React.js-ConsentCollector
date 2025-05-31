import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { JSX } from "react";

/**
 * Renders the children with any necessary context providers (e.g. react-query, router).
 */
export function renderWithProviders(
  children: React.ReactNode,
  routerProps?: MemoryRouterProps
): RenderResult {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

/**
 * Wraps the given children with a custom QueryClientProvider.
 * Useful for testing components or hooks that rely on a specific QueryClient instance.
 */
export function getQueryClientWrapper(
  children: React.ReactNode,
  queryClient: QueryClient
): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
