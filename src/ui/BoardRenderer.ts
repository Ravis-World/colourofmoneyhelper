import { GameEngine } from '../core/GameEngine';
import { getContrastTextColor } from '../utils/contrast';
import { formatCurrency } from '../utils/currency';

export class BoardRenderer {
    private gridElement: HTMLElement;
    private engine: GameEngine;

    constructor(gridId: string, engine: GameEngine) {
        const element = document.getElementById(gridId);
        if (!element) {
            throw new Error(`Element with id '${gridId}' not found.`);
        }
        this.gridElement = element;
        this.engine = engine;
        window.addEventListener('resize', () => this.fitTileNames());
    }

    private fitTileNames(): void {
        this.gridElement.querySelectorAll<HTMLElement>('.tile-name').forEach(name => {
            const text = name.querySelector<HTMLElement>('.tile-name-text');
            if (!text) return;

            let low = 10;
            let high = 26;
            let best = low;
            while (low <= high) {
                const size = Math.floor((low + high) / 2);
                text.style.fontSize = `${size}px`;
                if (text.scrollWidth <= name.clientWidth && text.scrollHeight <= name.clientHeight) {
                    best = size;
                    low = size + 1;
                } else {
                    high = size - 1;
                }
            }
            text.style.fontSize = `${best}px`;
        });
    }

    public render(): void {
        this.gridElement.innerHTML = '';
        const tiles = this.engine.getTiles();
        const { symbol, multiplier } = this.engine.getCurrencyConfig();

        tiles.forEach(tile => {
            const card = document.createElement('div');
            card.className = `tile ${tile.isRevealed ? 'revealed' : ''}`;
            card.style.backgroundColor = `#${tile.hex}`;
            card.style.color = getContrastTextColor(tile.hex);

            const name = document.createElement('div');
            name.className = 'tile-name';
            const nameText = document.createElement('span');
            nameText.className = 'tile-name-text';
            nameText.textContent = tile.name;
            name.appendChild(nameText);

            const hex = document.createElement('div');
            hex.className = 'tile-hex';
            hex.textContent = `#${tile.hex}`;
            hex.setAttribute('aria-label', `Hex color ${tile.hex}`);

            card.appendChild(name);
            card.appendChild(hex);

            if (tile.isRevealed) {
                name.style.opacity = '0.8';

                const value = document.createElement('div');
                value.className = 'tile-value';
                value.style.fontSize = '1.4rem';
                value.style.fontWeight = 'bold';
                value.style.marginTop = '4px';
                value.textContent = formatCurrency(tile.value, symbol, multiplier);
                card.appendChild(value);
            } else {
                card.addEventListener('click', () => {
                    this.engine.revealTile(tile.id);
                    this.render();
                    this.updateStats();
                });
            }

            this.gridElement.appendChild(card);
        });

        this.fitTileNames();
        this.updateStats();
    }

    public updateStats(): void {
        const stats = this.engine.getStats();
        const { symbol, multiplier } = this.engine.getCurrencyConfig();

        const bankedEl = document.getElementById('totalBanked');
        const remainingEl = document.getElementById('tilesRemaining');
        const highestEl = document.getElementById('highestRemaining');

        if (bankedEl) bankedEl.innerText = formatCurrency(stats.totalBanked, symbol, multiplier);
        if (remainingEl) remainingEl.innerText = stats.tilesRemaining.toString();
        if (highestEl) highestEl.innerText = formatCurrency(stats.highestRemaining, symbol, multiplier);
    }
}