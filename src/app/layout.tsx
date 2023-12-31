import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const calSans = localFont({
    src: '../assets/fonts/CalSans-SemiBold.otf',
    variable: '--font-cal-sans',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(inter.variable, calSans.variable)}>
                {/* <div className="fixed h-screen w-full bg-gradient-to-b from-neutral-300 to-stone-400"></div> */}
                <main className="flex min-h-screen w-full flex-col py-16 bg-neutral-100">
                    <Providers>{children}</Providers>
                </main>
                <Toaster />
            </body>
        </html>
    );
}
