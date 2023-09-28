'use client';

import { Button } from '@/components/ui/button';
import { generatePlaceholder, generatePrompt } from '@/lib/gen';
import { useCarPovider } from '@/lib/providers/cars-provider';
import { trpc } from '@/lib/providers/trpc-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCcw, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';

const formSchema = z.object({
    prompt: z.string().min(10).max(200),
});

const ImagineForm = () => {
    const { addEntry } = useCarPovider();
    const { toast } = useToast();

    const generateCar = trpc.replicate.generate.useMutation({
        onSuccess: ({ id, prompt }) => {
            addEntry({ id, prompt });
            form.setValue('prompt', generatePrompt(generatePlaceholder()));
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        // @ts-ignore
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: generatePrompt(generatePlaceholder()),
        },
    });

    const onSubmit = async (form: z.infer<typeof formSchema>) => {
        const prompt = form.prompt;
        const isValidCarPrompt =
            prompt.includes('car') ||
            prompt.includes('vehicle') ||
            prompt.includes('bike') ||
            prompt.includes('motorcycle');

        if (!isValidCarPrompt) {
            toast({
                variant: 'destructive',
                title: 'Invalid Prompt',
                description: 'Prompts must be related to cars or motorcycles.',
            });

            return;
        }

        generateCar.mutate({
            prompt: form.prompt,
        });
    };

    return (
        <div className="rounded-lg bg-neutral-50 border border-neutral-200 w-full max-w-xl overflow-hidden shadow-md mt-10">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <textarea
                    {...form.register('prompt')}
                    className="w-full ring-0 border-none outline-none p-4 resize-none bg-neutral-50 placeholder:text-neutral-400 text-neutral-800"
                    placeholder="A vintage, orange american sports car from the 1970s, driving near the beach, water reflection, cinematic, dramatic"
                    rows={3}
                />
                <div className="w-full my-2 h-[1px] bg-neutral-200"></div>
                <div className="flex items-center justify-between p-2">
                    <Button
                        type="button"
                        variant="ghost"
                        icon={<RefreshCcw className="h-4 w-4" />}
                        onClick={() =>
                            form.setValue(
                                'prompt',
                                generatePrompt(generatePlaceholder()),
                            )
                        }
                    >
                        New prompt
                    </Button>
                    <Button
                        disabled={!form.formState.isValid}
                        size="sm"
                        icon={<Sparkles className="w-4 h-4" />}
                        loading={generateCar.isLoading}
                    >
                        Dream
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ImagineForm;
