import { QueryClientProvider as ReactQueryClientProvider } from "react-query";
import { queryClient } from "./constants";

export type QueryClientProviderProps = {
  children?: React.ReactNode;
};

const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryClientProvider>
);

export default QueryClientProvider;
