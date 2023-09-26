'use client';

import { CarsProvider } from '@/lib/providers/cars-provider';
import { TrpcProvider } from '@/lib/providers/trpc-provider';
import { Analytics } from '@vercel/analytics/react';

const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
    return (
        <>
            <TrpcProvider>
                <CarsProvider>{children}</CarsProvider>
            </TrpcProvider>
            <Analytics />
        </>
    );
};

export default Providers;
