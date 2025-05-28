import { tr } from "../trpc";
import { z } from "zod";

export const greetingRouter = tr.router({
  hello: tr.procedure
    .input(z.object({ name: z.string() }))
  
    .query(({ input, ctx}) => `Hello, ${ctx.db.nate}!`),
});
