import { inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";
import { appRouter } from "./router";

export type AppRouter = typeof appRouter;
export type Context = inferAsyncReturnType<typeof createContext>;
