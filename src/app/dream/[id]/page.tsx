import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import Dream from './dream';
import { Metadata } from 'next';

interface Props {
    params: {
        id: string;
    };
}

const getDream = (id: string) => {
    return kv.hgetall<{ id: string; url?: string; prompt: string }>(id);
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata | undefined> => {
    const dream = await getDream(params.id);
    if (!dream || !dream.url) return undefined;

    const title = `Dream #${dream.id}`;
    const description = dream.prompt;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [dream.url],
        },
        twitter: {
            card: 'summary_large_image',
            creator: '@erosemberg_',
            title,
            description,
            images: [dream.url],
        },
    };
};

const DreamPage = async ({ params }: Props) => {
    const dream = await getDream(params.id);

    if (!dream) {
        notFound();
    }

    return <Dream dream={dream} />;
};

export default DreamPage;
