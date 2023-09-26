import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        REPLICATE_TOKEN: z.string(),
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },

    runtimeEnv: {
        REPLICATE_TOKEN: process.env.REPLICATE_TOKEN,
        NODE_ENV: process.env.NODE_ENV,
    },
});
