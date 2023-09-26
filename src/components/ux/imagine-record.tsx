'use client';

import { useCarPovider } from '@/lib/providers/cars-provider';
import { FadeInStagger } from '../ui/fade-in';
import ImagineCard from './imagine-card';

const ImagineRecord = () => {
    const { record } = useCarPovider();

    return (
        <FadeInStagger className="w-full grid grid-cols-4 gap-4">
            {record.map((entry) => (
                <ImagineCard key={entry.id} imagination={entry} />
            ))}
        </FadeInStagger>
    );
};

export default ImagineRecord;
