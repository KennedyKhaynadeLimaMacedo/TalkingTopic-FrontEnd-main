import { StyleSheet, Platform, StatusBar } from 'react-native';

export const chatSelectStyles = StyleSheet.create({

    // ── Fundo ────────────────────────────────────────────────────────
    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    innerContainer: {
        padding: 24,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 24 : 60,
        paddingBottom: 40,
    },

    // ── Bolas de glow decorativas ────────────────────────────────────
    glowBall1: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(74, 222, 128, 0.08)',
        top: -60,
        right: -80,
    },
    glowBall2: {
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(34, 211, 238, 0.06)',
        bottom: 100,
        left: -60,
    },

    // ── Header ───────────────────────────────────────────────────────
    header: {
        marginBottom: 36,
        alignItems: 'center',
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4ADE80',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.45)',
        textAlign: 'center',
        lineHeight: 22,
    },

    // ── Lista de categorias ──────────────────────────────────────────
    categoryContainer: {
        gap: 14,
    },

    // ── Card de categoria — glassmorfismo ────────────────────────────
    categoryCard: {
        // Vidro: fundo translúcido sobre o fundo escuro
        backgroundColor: 'rgba(255, 255, 255, 0.05)',

        // Bordas: brilho sutil nos lados
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        borderTopColor: 'rgba(255, 255, 255, 0.22)', // linha de luz no topo

        borderRadius: 20,
        padding: 22,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,

        // Sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
    },

    // Estado pressionado
    categoryCardPressed: {
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        borderColor: 'rgba(74, 222, 128, 0.3)',
        borderTopColor: 'rgba(74, 222, 128, 0.5)',
    },

    // Ícone dentro de bolha glassmorfismo
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        fontSize: 28,
    },

    // Textos do card
    cardTextContainer: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: '#4ADE80',
        marginBottom: 3,
        letterSpacing: 0.1,
    },
    description: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.45)',
        lineHeight: 18,
    },

    // Seta do card
    cardArrow: {
        fontSize: 18,
        color: 'rgba(74, 222, 128, 0.5)',
    },

    // ── Rodapé ───────────────────────────────────────────────────────
    footer: {
        marginTop: 36,
    },
});
