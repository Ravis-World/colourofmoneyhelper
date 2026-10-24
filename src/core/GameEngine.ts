import { ColorTile, CurrencyConfig, GameStats } from '../types/game.types';
import { GAME_COLORS } from '../constants/colors.constants';

export class GameEngine {
    private tiles: ColorTile[] = [];
    private currencyConfig: CurrencyConfig = { symbol: '$', multiplier: 1 };

    constructor() {
        this.resetGame();
    }

    public resetGame(): void {
        // Generate monetary values 1,000 to 20,000 in steps of 1,000
        const values = Array.from({ length: 20 }, (_, i) => (i + 1) * 1000);

        const shuffledColors = [...GAME_COLORS];
        for (let i = 0; i < values.length && i < shuffledColors.length; i++) {
            const j = i + Math.floor(Math.random() * (shuffledColors.length - i));
            [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
        }

        this.tiles = shuffledColors.slice(0, values.length).map((color, index) => ({
            id: index,
            name: color.name,
            hex: color.hex,
            value: values[index],
            isRevealed: false
        }));
    }

    public revealTile(id: number): ColorTile | null {
        const tile = this.tiles.find(t => t.id === id);
        if (tile && !tile.isRevealed) {
            tile.isRevealed = true;
            return tile;
        }
        return null;
    }

    public getTiles(): ColorTile[] {
        return this.tiles;
    }

    public setCurrency(symbol: string, multiplier: number = 1): void {
        this.currencyConfig = { symbol, multiplier };
    }

    public getCurrencyConfig(): CurrencyConfig {
        return this.currencyConfig;
    }

    public getStats(): GameStats {
        const unrevealed = this.tiles.filter(t => !t.isRevealed);
        const totalBanked = this.tiles
            .filter(t => t.isRevealed)
            .reduce((sum, t) => sum + t.value, 0);

        const highestRemaining = unrevealed.length > 0 
            ? Math.max(...unrevealed.map(t => t.value)) 
            : 0;

        return {
            totalBanked,
            tilesRemaining: unrevealed.length,
            highestRemaining
        };
    }
}