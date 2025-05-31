import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

export const renderWithProviders = (
  children: React.ReactNode,
  routerProps?: MemoryRouterProps
): RenderResult =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
