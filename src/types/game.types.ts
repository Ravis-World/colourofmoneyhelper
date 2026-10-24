export interface ColorTile {
    id: number;
    name: string;
    hex: string;
    value: number;
    isRevealed: boolean;
}

export interface CurrencyConfig {
    symbol: string;
    multiplier: number;
}

export interface GameStats {
    totalBanked: number;
    tilesRemaining: number;
    highestRemaining: number;
}