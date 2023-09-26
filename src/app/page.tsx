import MaxWidthContainer from '@/components/max-width';
import { FadeIn, FadeInStagger } from '@/components/ui/fade-in';
import ImagineForm from '@/components/ux/imagine-form';
import ImagineRecord from '@/components/ux/imagine-record';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dream Wheels',
    description: 'AI-powered tool to generate your dream vintage/classic car',
};

const Home = () => {
    return (
        <MaxWidthContainer>
            <FadeInStagger
                faster
                className="flex flex-col w-full items-center justify-center text-center"
            >
                <FadeIn>
                    <h1 className="font-display text-4xl text-neutral-800">
                        Dream Wheels.
                    </h1>
                </FadeIn>
                <FadeIn className="w-full flex self-center items-center justify-center">
                    <ImagineForm />
                </FadeIn>
                <FadeIn className="w-full flex items-center mt-10">
                    <ImagineRecord />
                </FadeIn>
            </FadeInStagger>
        </MaxWidthContainer>
    );
};

export default Home;
