import { draw } from 'radash';

interface PromptOptions {
    color?: string;
    era?: string;
    location?: string;
    type?: string;
    origin?: string;
}

const staticParts = [
    'Cinematic',
    'dramatic',
    'in motion',
    'realistic',
    'ultra high-quality background and roads',
];

export const generatePrompt = ({
    color = 'grey',
    era = '1960s',
    location = 'sahara desert',
    type = 'rally',
    origin = 'british',
}: PromptOptions): string => {
    const prompt = `A vintage, ${color}, ${origin} car from the ${era}, ${type} through ${location}`;

    return prompt;
};

export const generateReplicatePrompt = (prompt: string) => {
    return `${prompt}. ${staticParts.join(
        ', ',
    )}. Picture taken from the left hand side with a DSLR camera, medium grain. Car must be centered within the surroundings and facing the front.`;
};

export const generatePlaceholder = (): PromptOptions => {
    const colors = [
        'english green',
        'silver',
        'orange',
        'midnight black',
        'white',
        'cream',
        'red',
        'maroon',
        'mustard color'
    ];
    const era = [
        '1920s',
        '1930s',
        '1940s',
        '1950s',
        '1960s',
        '1970s',
        '1980s',
        '1990s',
        'pre-war era',
    ];
    const locations = [
        'the sahara desert',
        'the french alps',
        'the argentine patagonia',
        'the antarctic',
        'greenland',
        'a national park',
        'a rainforest',
        'the amazonian rainforest',
        'egypt with pyramids',
        'a vietnamese jungle',
        'a bridge over the potomac',
        'a road next to the nile',
        'the scottish highlands',
        'edinbrugh castle',
        'buenos aires\' streets'
    ];
    const type = [
        'rally',
        'joy-ride',
        'driving at midnight',
        'rainy drive',
        'snowing drive',
        'driving at sunset',
        'driving at sunrise',
        'driving during a starry night'
    ];
    const origin = [
        'american',
        'british',
        'german',
        'japanese',
        'french',
        'italian',
        'american sports',
        'british sports',
        'german sports',
        'italian sports',
        'japanese sports'
    ];

    return {
        color: draw(colors)!,
        era: draw(era)!,
        location: draw(locations)!,
        type: draw(type)!,
        origin: draw(origin)!,
    };
};
