"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderContainer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type FC, type PropsWithChildren } from "react";

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProviderContainer client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProviderContainer>
  );
};

export default QueryClientProvider;
