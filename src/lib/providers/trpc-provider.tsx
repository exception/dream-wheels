'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, getFetch, loggerLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';
import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/server/root';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type trpcClient = ReturnType<typeof createTRPCReact<AppRouter>>;
export const trpc: trpcClient = createTRPCReact<AppRouter>();

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 5000, refetchOnWindowFocus: false },
                },
            }),
    );

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                loggerLink({
                    enabled: () => process.env.NODE_ENV !== 'production',
                }),
                httpBatchLink({
                    url: '/api/trpc',
                    fetch: async (input, init?) => {
                        const fetch = getFetch();
                        return fetch(input, {
                            ...init,
                            credentials: 'include',
                        });
                    },
                }),
            ],
            transformer: superjson,
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {/* <ReactQueryDevtools
                    position="bottom-left"
                    initialIsOpen={false}
                /> */}
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
