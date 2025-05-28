import { tr } from "./trpc";
import { greetingRouter } from "./routers/greeting";

export const appRouter = tr.router({
  greeting: greetingRouter,
  post: tr.procedure.mutation(async ({ ctx }) => ctx.db.nate),
});

export type AppRouter = typeof appRouter;
