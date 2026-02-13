// Theme constants for consistent styling
export const COLORS = {
    primary: '#2D6A4F',
    primaryLight: '#40916C',
    primaryDark: '#1B4332',
    secondary: '#52B788',
    accent: '#95D5B2',
    background: '#F0F4F0',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAF8',
    text: '#1B1B1B',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    error: '#EF4444',
    errorBg: '#FEF2F2',
    white: '#FFFFFF',
};

export const FONTS = {
    regular: { fontSize: 14, color: COLORS.text },
    medium: { fontSize: 14, fontWeight: '500', color: COLORS.text },
    bold: { fontSize: 14, fontWeight: '700', color: COLORS.text },
    h1: { fontSize: 28, fontWeight: '800', color: COLORS.text },
    h2: { fontSize: 22, fontWeight: '700', color: COLORS.text },
    h3: { fontSize: 18, fontWeight: '600', color: COLORS.text },
    caption: { fontSize: 12, color: COLORS.textSecondary },
};

export const SHADOWS = {
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
    },
};
