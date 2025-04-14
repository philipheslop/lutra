import { createCallerFactory, createTRPCRouter } from "@lutra/server/api/trpc";
import { helloRouter } from "./routers/hello";
import { patientsRouter } from "./routers/patients";
import { appointmentsRouter } from "./routers/appointments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: helloRouter,
  patients: patientsRouter,
  appointments: appointmentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
