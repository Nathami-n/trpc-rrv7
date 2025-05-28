import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import SuperJSON from "superjson";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "~/server";
import { useState, type ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  return `http://localhost:${process.env.PORT ?? 5173}`;
};

const links = [
  loggerLink({
    enabled: (op) =>
      process.env.NODE_ENV === "development" ||
      (op.direction === "down" && op.result instanceof Error),
  }),
  httpBatchLink({
    transformer: SuperJSON,
    url: getBaseUrl() + "/api/trpc",
    headers() {
      const headers = new Headers();
      headers.set("x-trpc-source", "react");
      return headers;
    },
  }),
];

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export function ReactTRPCWithQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClieent = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links,
    })
  );

  return (
    <QueryClientProvider client={queryClieent}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClieent}>
        {children}
      </TRPCProvider>

    </QueryClientProvider>
  )


}
