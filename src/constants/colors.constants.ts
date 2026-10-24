import colourNames from './colour-names.json';

export interface ColorDefinition {
    name: string;
    hex: string;
    votes: number;
}

export const GAME_COLORS: ColorDefinition[] = colourNames;
