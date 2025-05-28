import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { appRouter } from "~/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { db } from "~/server/db";

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};

function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: args.request,
    router: appRouter,
    createContext: () => {
      return {
        db,
      };
    },
  });
}
