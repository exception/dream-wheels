import MaxWidthContainer from '@/components/max-width';
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in';
import { Imagination } from '@/lib/providers/cars-provider';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    dream: Imagination;
}

const Dream = ({ dream }: Props) => {
    return (
        <MaxWidthContainer>
            <FadeInStagger
                faster
                className="flex flex-col w-full items-center justify-center text-center"
            >
                <FadeIn>
                    <Link href="/">
                        <h1 className="font-display text-4xl text-neutral-800">
                            Dream Wheels.
                        </h1>
                    </Link>
                </FadeIn>
                <FadeIn>
                    <p className="text-center text-base text-neutral-400 mt-6">
                        Imagine... {dream.prompt.toLowerCase()}
                    </p>
                </FadeIn>
                <FadeIn className="mt-10">
                    <Image
                        className="h-[1200px] w-[1200px] aspect-square object-cover"
                        src={dream.url ?? ''}
                        alt={dream.id}
                        height={1200}
                        width={1200}
                        unoptimized
                        priority
                    />
                </FadeIn>
            </FadeInStagger>
        </MaxWidthContainer>
    );
};

export default Dream;
