import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "@/env.mjs";
import { appRouter } from "@/server/root";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export default createNextApiHandler({
  router: appRouter,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
