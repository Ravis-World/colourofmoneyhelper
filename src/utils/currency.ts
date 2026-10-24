export function formatCurrency(amount: number, symbol: string, multiplier: number = 1): string {
    const total = amount * multiplier;
    return `${symbol}${total.toLocaleString()}`;
}