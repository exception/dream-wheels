import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

const MaxWidthContainer = ({
    className,
    children,
}: React.PropsWithChildren<Props>) => {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 h-auto z-10',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthContainer;
