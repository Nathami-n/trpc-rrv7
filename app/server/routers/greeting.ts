import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "../trpc";

export const greetingRouter = {
  hello: publicProcedure.query(({ctx}) => {
    return "Hello you";
  }),

  user: protectedProcedure.mutation(async ({ ctx }) => {
    
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
    return {
      name: user?.name,
      id: user?.id,
    };
  }),
} satisfies TRPCRouterRecord;
