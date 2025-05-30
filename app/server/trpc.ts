import superjson from "superjson";
import { auth } from "~/utils/auth/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { db } from "./db";

// this creates the trpc context
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const authSession = await auth.api.getSession({
    headers: opts.headers,
  });
  return {
    db,
    user: authSession?.user,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});


//==== UTILITIES =====

// caller factory for making server-side trpc calls
export const createCallerFactory = t.createCallerFactory;

// to create the router
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

// protected procedures
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
