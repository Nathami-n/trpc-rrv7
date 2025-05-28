import superjson from "superjson";
import { auth } from "~/utils/auth/server";
import { db } from "./db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const authSession = await auth.api.getSession({
    headers: opts.headers,
  });

  const source = opts.headers.get("x-trpc-source") ?? "unknown";

  console.log("Source by", authSession?.user.email);

  return {
    db,
    user: authSession?.user,
  };
};
