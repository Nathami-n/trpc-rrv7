import {tr} from "./trpc";
import {greetingRouter} from "./routers/greeting";


export const appRouter = tr.router({
  greeting: greetingRouter
})

export type AppRouter = typeof appRouter;