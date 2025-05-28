import type { LoaderFunctionArgs } from "react-router";
import { appRouter } from "~/server";
import { creaetCallerFactory, createTRPCContext } from "~/server/trpc";

const createContext = (opts: { headers: Headers }) => {
  const headers = new Headers(opts.headers);
  headers.set("x-trpc-sourc", "server-loader");

  return createTRPCContext({
    headers,
  });
};

const createCaller = creaetCallerFactory(appRouter);

export const caller = async (loaderArgs: LoaderFunctionArgs) =>
  createCaller(await createContext({ headers: loaderArgs.request.headers }));
