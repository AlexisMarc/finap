/* Utilidades de contraste WCAG (ratio de luminancia relativa). */
function hexToRgb(hex) {
    const value = hex.replace('#', '');
    const full = value.length === 3
        ? value
            .split('')
            .map((c) => c + c)
            .join('')
        : value;
    const num = parseInt(full, 16);
    if (Number.isNaN(num) || full.length !== 6) {
        throw new Error(`Color hexadecimal no válido: ${hex}`);
    }
    return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}
export function relativeLuminance(hex) {
    const [r, g, b] = hexToRgb(hex).map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrastRatio(hexA, hexB) {
    const l1 = relativeLuminance(hexA);
    const l2 = relativeLuminance(hexB);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}
export function meetsAA(hexA, hexB, largeText = false) {
    return contrastRatio(hexA, hexB) >= (largeText ? 3 : 4.5);
}
