import Replicate from 'replicate';
import { env } from '@/env.mjs';
import { WEBHOOK_URL, delay, nanoid } from './utils';
import { generateReplicatePrompt } from './gen';
import { kv } from '@vercel/kv';

const replicate = new Replicate({
    auth: env.REPLICATE_TOKEN,
});

export const generateCar = async (prompt: string) => {
    const promptId = nanoid();
    const replicatePrompt = generateReplicatePrompt(prompt);

    await Promise.all([
        kv.hset(promptId, {
            id: promptId,
            prompt: replicatePrompt,
        }),
        replicate.predictions.create({
            version:
                '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
            input: {
                prompt: replicatePrompt,
                negative_prompt:
                    'deformed, motionless, out of frame, painting, unreal, ((driver, male driver, female driver)), people, persons, companions, animals, license plate, identifier, plate, morphed headlights, deformed roads, duplicated headlights, deformed wheels',
            },
            webhook_events_filter: ['completed'],
            webhook: `${WEBHOOK_URL}?id=${promptId}`
        }),
    ]);

    await delay(1_500);

    return promptId;
};
