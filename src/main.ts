import { GameEngine } from './core/GameEngine';
import { BoardRenderer } from './ui/BoardRenderer';

const nextFrame = (): Promise<void> => new Promise(resolve => requestAnimationFrame(() => resolve()));

function updateLoadingProgress(percent: number, message: string): void {
    const progress = document.getElementById('loadingProgress') as HTMLProgressElement | null;
    const percentLabel = document.getElementById('loadingPercent');
    const messageLabel = document.getElementById('loadingMessage');

    if (progress) progress.value = percent;
    if (percentLabel) percentLabel.textContent = `${percent}%`;
    if (messageLabel) messageLabel.textContent = message;
}

async function initializeGame(): Promise<void> {
    const loadingScreen = document.getElementById('loadingScreen');
    try {
        updateLoadingProgress(10, 'Preparing the game...');
        await nextFrame();

        const engine = new GameEngine();
        const renderer = new BoardRenderer('colorGrid', engine);

        updateLoadingProgress(45, 'Setting up the game board...');
        await nextFrame();

        renderer.render();

        updateLoadingProgress(85, 'Finishing up...');
        await nextFrame();

        const resetBtn = document.getElementById('resetBtn');
        resetBtn?.addEventListener('click', () => {
            engine.resetGame();
            renderer.render();
        });

        const currencySelect = document.getElementById('currencySelect') as HTMLSelectElement | null;
        currencySelect?.addEventListener('change', (event) => {
            const target = event.target as HTMLSelectElement;
            engine.setCurrency(target.value, 1);
            renderer.render();
        });

        updateLoadingProgress(100, 'Ready!');
        await nextFrame();
        loadingScreen?.classList.add('loading-screen-hidden');
    } catch (error) {
        console.error('Unable to initialize the game.', error);
        const messageLabel = document.getElementById('loadingMessage');
        if (messageLabel) messageLabel.textContent = 'The game could not be loaded. Please refresh to try again.';
        loadingScreen?.classList.add('loading-screen-error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    void initializeGame();
});