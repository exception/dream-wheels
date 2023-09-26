import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('id') as string;

    const body = await req.json();
    const { output } = body;

    if (!output) {
        return new Response('Invalid Replicate output', { status: 400 });
    }

    const file = await fetch(output[0]).then((res) => res.blob());

    const { url } = await put(`${id}.png`, file, { access: 'public' });

    await kv.hset(id, { url });

    return NextResponse.json({ ok: true });
};
