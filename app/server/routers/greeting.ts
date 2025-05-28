import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "../trpc";

export const greetingRouter = {
  hello: publicProcedure.query(() => {
    return "Hello you";
  }),

  user: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });

    return user;
  }),
} satisfies TRPCRouterRecord;
