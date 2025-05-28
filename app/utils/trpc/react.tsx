import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { type AppRouter } from "~/server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5173/api/trpc",
      headers() {
        const headers = new Headers();
        headers.set("x-trpc-source", "react");

        return headers;
      },
    }),
  ],
});

export {trpc}



