import { initTRPC } from "@trpc/server";
import { db } from "./db";

export const tr = initTRPC.context<{db: typeof db}>().create();
