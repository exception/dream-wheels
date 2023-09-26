'use client';

import { Imagination, useCarPovider } from '@/lib/providers/cars-provider';
import { trpc } from '@/lib/providers/trpc-provider';
import { Loader2, Menu, Star, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface Props {
    imagination: Imagination;
    refreshInterval?: number;
}

const ImagineCard = ({ imagination, refreshInterval = 1000 }: Props) => {
    const [finished, setFinished] = useState(false);
    const { updateEntry } = useCarPovider();
    const { isInitialLoading, data } = trpc.replicate.get.useQuery(
        {
            id: imagination.id,
        },
        {
            refetchInterval: refreshInterval,
            refetchIntervalInBackground: true,
            enabled: !finished,
        },
    );

    useEffect(() => {
        if (data?.url) {
            updateEntry(imagination.id, {
                ...imagination,
                url: data.url,
            });
            setFinished(true);
        }
    }, [data]);

    return (
        <div className="rounded-md w-full border border-neutral-200 bg-neutral-50 col-span-2 shadow-sm text-left overflow-hidden">
            <div className="flex w-full justify-between items-center p-4">
                <div className="flex flex-col space-y-2">
                    <p className="text-sm text-neutral-600">
                        #{imagination.id}
                    </p>
                    <p className="text-xs text-neutral-400 max-w-sm">
                        {imagination.prompt}
                    </p>
                </div>
                {finished && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={'ghost'}
                                icon={<Menu className="h-4 w-4" />}
                            ></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                            <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                <span>Showcase</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <Separator />
            <div className="flex justify-center items-center overflow-hidden">
                {isInitialLoading ||
                    (!data?.url && (
                        <div className="p-4">
                            <Loader2 className="h-10 w-10 animate-spin text-neutral-500" />
                        </div>
                    ))}
                {data?.url && (
                    <div className="flex flex-col w-full h-full">
                        <Zoom
                            zoomImg={{
                                src: data.url,
                                height: 1200,
                                width: 1200,
                            }}
                            zoomMargin={0}
                        >
                            <Image
                                className="h-full w-full aspect-square object-cover"
                                src={data.url}
                                alt={imagination.id}
                                height={400}
                                width={400}
                            />
                        </Zoom>
                        <div className="p-4 bg-neutral-100 ">
                            <p className="text-xs text-neutral-400">
                                Full Prompt: {data.prompt}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagineCard;
