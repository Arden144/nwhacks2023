import { PrismaClient } from "@prisma/client/edge";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "./context";
import { globals } from "./globals";
import { appRouter } from "./router";

export interface Env {
  DATABASE_URL: string;
}

export default {
  async fetch(
    req: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (globals._prisma === null) {
      globals._prisma = new PrismaClient({
        datasources: { db: { url: env.DATABASE_URL } },
      });
    }

    let res: Response;

    if (req.method === "OPTIONS") {
      res = new Response();
    } else {
      res = await fetchRequestHandler({
        endpoint: "/trpc",
        req: req,
        router: appRouter,
        createContext,
      });
    }
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Request-Method", "*");
    res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.headers.set("Access-Control-Allow-Headers", "*");

    return res;
  },
};
