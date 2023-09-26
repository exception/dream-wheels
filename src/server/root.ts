import { replicateRoutes } from "./routes/replicate";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
    replicate: replicateRoutes
});

export type AppRouter = typeof appRouter;