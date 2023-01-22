import { PrismaClient } from "@prisma/client/edge";
import { initTRPC } from "@trpc/server";
import { Context } from "./exports";

export interface Globals {
  _prisma: PrismaClient | null;
  prisma: PrismaClient;
}

export const globals: Globals = {
  _prisma: null,
  get prisma() {
    if (this._prisma === null) {
      throw new Error("tried to use prisma without initializing first.");
    }
    return this._prisma;
  },
};

export const t = initTRPC.context<Context>().create();
