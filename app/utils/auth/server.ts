import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: typeof window == "undefined" ? process.env.GOOGLE_CLIENT_ID as string : "",
      clientSecret: typeof window === "undefined" ?  process.env.GOOGLE_CLIENT_SECRET as string : "",
    },
  },

  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
});
