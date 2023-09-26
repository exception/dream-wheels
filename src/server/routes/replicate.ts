import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateCar } from "@/lib/replicate";
import { kv } from "@vercel/kv";

export const replicateRoutes = createTRPCRouter({
    generate: publicProcedure.input(z.object({
        prompt: z.string()
    })).mutation(async ({ input }) => {
        const id = await generateCar(input.prompt);

        return { id, prompt: input.prompt };
    }),
    get: publicProcedure.input(z.object({
        id: z.string()
    })).query(({ input }) => {
        return kv.hgetall<{ id: string; url?: string; prompt: string }>(input.id);
    })
})