import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// ── Design Tokens ──────────────────────────────────────────────────
export const LG = {
    // Cores base do tema
    bg:           '#050A0F',        // Fundo ultra escuro azul-noite
    bgMid:        '#080F18',        // Fundo médio
    green:        '#4ADE80',        // Verde principal
    greenDim:     'rgba(74,222,128,0.18)',
    greenGlow:    'rgba(74,222,128,0.08)',
    cyan:         '#22D3EE',        // Ciano acento
    cyanDim:      'rgba(34,211,238,0.12)',
    purple:       '#A78BFA',        // Roxo acento
    purpleDim:    'rgba(167,139,250,0.10)',

    // Liquid Glass — camadas de vidro
    glass1:       'rgba(255,255,255,0.045)', // Vidro mais sutil
    glass2:       'rgba(255,255,255,0.08)',  // Vidro médio
    glass3:       'rgba(255,255,255,0.12)',  // Vidro mais visível
    glassGreen:   'rgba(74,222,128,0.10)',   // Vidro tingido de verde
    glassCyan:    'rgba(34,211,238,0.08)',   // Vidro tingido de ciano

    // Bordas de vidro
    border1:      'rgba(255,255,255,0.08)',
    border2:      'rgba(255,255,255,0.14)',
    border3:      'rgba(255,255,255,0.22)',
    borderGreen:  'rgba(74,222,128,0.28)',
    borderTop:    'rgba(255,255,255,0.30)',  // Brilho no topo (specular highlight)

    // Textos
    text1:        '#F0FFF4',
    text2:        'rgba(255,255,255,0.70)',
    text3:        'rgba(255,255,255,0.40)',
    textGreen:    '#4ADE80',

    // Raios
    r12: 12, r16: 16, r20: 20, r24: 24, r28: 28, r32: 32, r40: 40,
};

// ── Componente base: cápsula Liquid Glass ─────────────────────────
// Este é o padrão fundamental do iOS 26 —
// superfície translúcida com specular highlight no topo
export const liquidGlass = {
    backgroundColor: LG.glass2,
    borderWidth: 1,
    borderColor: LG.border2,
    borderTopColor: LG.borderTop,
    // Sombra interna simulada via shadowColor
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
};

export const liquidGlassGreen = {
    backgroundColor: LG.glassGreen,
    borderWidth: 1,
    borderColor: LG.borderGreen,
    borderTopColor: 'rgba(74,222,128,0.50)',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 8,
};

// ── Welcome Screen ─────────────────────────────────────────────────
export const welcomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LG.bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 48,
        paddingHorizontal: 28,
    },

    // Fundo com orbes de luz
    orb1: {
        position: 'absolute',
        width: 360,
        height: 360,
        borderRadius: 180,
        backgroundColor: 'rgba(74,222,128,0.07)',
        top: -80,
        left: -100,
    },
    orb2: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(34,211,238,0.05)',
        bottom: 100,
        right: -80,
    },
    orb3: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(167,139,250,0.06)',
        top: '40%',
        right: -60,
    },

    heroSection: {
        alignItems: 'center',
        gap: 0,
    },

    // Moldura Liquid Glass ao redor da logo
    logoFrame: {
        width: 128,
        height: 128,
        borderRadius: 36,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        // Brilho verde sutil
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 32,
    },
    logo: {
        width: 88,
        height: 88,
    },

    // Badge "NOVO" acima do título
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        ...liquidGlassGreen,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: LG.green,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: LG.green,
        letterSpacing: 1.5,
    },

    title: {
        fontSize: 42,
        fontWeight: '800',
        color: LG.text1,
        textAlign: 'center',
        letterSpacing: -1.5,
        lineHeight: 48,
        marginBottom: 4,
    },
    titleAccent: {
        color: LG.green,
    },
    subtitle: {
        fontSize: 16,
        color: LG.text3,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
        marginTop: 12,
    },

    // Pill de features
    pillRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 24,
    },
    pill: {
        ...liquidGlass,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    pillIcon: { fontSize: 13 },
    pillText: {
        fontSize: 12,
        color: LG.text2,
        fontWeight: '600',
    },

    // Botões
    buttonGroup: {
        width: '100%',
        gap: 12,
    },

    // Botão primário — Liquid Glass verde sólido
    btnPrimary: {
        width: '100%',
        height: 58,
        borderRadius: 20,
        backgroundColor: LG.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(74,222,128,1)',
        borderTopColor: 'rgba(200,255,220,0.7)',
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 8,
    },
    btnPrimaryText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#03060A',
        letterSpacing: 0.3,
    },

    // Botão secundário — Liquid Glass transparente
    btnSecondary: {
        width: '100%',
        height: 58,
        borderRadius: 20,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSecondaryText: {
        fontSize: 17,
        fontWeight: '600',
        color: LG.text1,
        letterSpacing: 0.2,
    },

    helpText: {
        fontSize: 13,
        color: LG.text3,
        textAlign: 'center',
    },
});

// ── Login & Register Screen ────────────────────────────────────────
export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LG.bg,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
    },

    orb1: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(74,222,128,0.06)',
        top: -120,
        right: -120,
    },
    orb2: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(34,211,238,0.04)',
        bottom: 0,
        left: -100,
    },

    // Card principal Liquid Glass
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 36,
        ...liquidGlass,
        padding: 32,
        alignItems: 'center',
        gap: 0,
        // Borda especular dupla (inner glow simulado)
        borderWidth: 1,
        borderColor: LG.border2,
        borderTopColor: LG.borderTop,
    },

    logoFrame: {
        width: 88,
        height: 88,
        borderRadius: 26,
        ...liquidGlassGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: { width: 60, height: 60 },

    appName: {
        fontSize: 13,
        fontWeight: '700',
        color: LG.green,
        letterSpacing: 2,
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: LG.text1,
        textAlign: 'center',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: LG.text3,
        textAlign: 'center',
        marginBottom: 28,
    },

    // Separador visual
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: LG.border1,
        marginBottom: 24,
    },

    // Container de inputs
    inputs: {
        width: '100%',
        gap: 14,
        marginBottom: 24,
    },

    // Campo de input Liquid Glass
    inputWrap: {
        width: '100%',
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: LG.text3,
        letterSpacing: 0.8,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputGlass: {
        width: '100%',
        height: 54,
        borderRadius: 16,
        ...liquidGlass,
        paddingHorizontal: 18,
        color: LG.text1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: LG.border2,
        borderTopColor: LG.borderTop,
        ...Platform.select({ web: { outlineStyle: 'none' } }),
    } as any,
    inputFocused: {
        borderColor: LG.borderGreen,
        borderTopColor: 'rgba(74,222,128,0.50)',
        backgroundColor: LG.glassGreen,
        shadowColor: '#4ADE80',
        shadowOpacity: 0.15,
    },

    // Botões
    btnPrimary: {
        width: '100%',
        height: 58,
        borderRadius: 18,
        backgroundColor: LG.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderTopColor: 'rgba(200,255,220,0.7)',
        borderColor: LG.green,
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
        elevation: 7,
        marginBottom: 10,
    },
    btnPrimaryText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#030812',
        letterSpacing: 0.5,
    },
    btnGhost: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnGhostText: {
        fontSize: 15,
        color: LG.green,
        fontWeight: '600',
    },
    btnOutline: {
        width: '100%',
        height: 54,
        borderRadius: 18,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    btnOutlineText: {
        fontSize: 15,
        color: LG.text1,
        fontWeight: '600',
    },
});

// ── Home Screen ────────────────────────────────────────────────────
export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LG.bg,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 22,
        paddingTop: 60,
        paddingBottom: 40,
    },

    orb1: {
        position: 'absolute',
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: 'rgba(74,222,128,0.07)',
        top: -80,
        right: -100,
    },
    orb2: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(34,211,238,0.05)',
        top: '45%',
        left: -80,
    },

    // Header com avatar + saudação
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    greeting: {
        gap: 2,
    },
    greetingSmall: {
        fontSize: 13,
        color: LG.text3,
        fontWeight: '500',
    },
    greetingName: {
        fontSize: 26,
        fontWeight: '800',
        color: LG.text1,
        letterSpacing: -0.5,
    },

    // Avatar Liquid Glass
    avatarRing: {
        width: 52,
        height: 52,
        borderRadius: 18,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: { fontSize: 24 },

    // Hero card
    heroCard: {
        width: '100%',
        borderRadius: 32,
        ...liquidGlass,
        padding: 28,
        marginBottom: 24,
        overflow: 'hidden',
    },
    heroCardAccent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: LG.green,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        opacity: 0.8,
    },
    heroLogoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 16,
    },
    heroLogo: {
        width: 56,
        height: 56,
        borderRadius: 16,
        ...liquidGlassGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroLogoImg: { width: 38, height: 38 },
    heroAppName: {
        fontSize: 22,
        fontWeight: '800',
        color: LG.green,
        letterSpacing: -0.3,
    },
    heroTagline: {
        fontSize: 12,
        color: LG.text3,
        fontWeight: '500',
    },
    heroDesc: {
        fontSize: 15,
        color: LG.text2,
        lineHeight: 22,
        marginBottom: 20,
    },

    // Linha de stats
    statsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    statPill: {
        flex: 1,
        ...liquidGlassGreen,
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: 'center',
        gap: 2,
    },
    statIcon: { fontSize: 18 },
    statLabel: {
        fontSize: 11,
        color: LG.text3,
        fontWeight: '500',
    },

    // Seção de ações rápidas
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: LG.text3,
        letterSpacing: 1.2,
        marginBottom: 14,
        marginLeft: 4,
    },

    // Grid de ações 2x2
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    actionCard: {
        width: (width - 44 - 12) / 2,
        borderRadius: 22,
        ...liquidGlass,
        padding: 18,
        gap: 10,
    },
    actionCardPrimary: {
        backgroundColor: LG.glassGreen,
        borderColor: LG.borderGreen,
        borderTopColor: 'rgba(74,222,128,0.50)',
    },
    actionIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 13,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: { fontSize: 20 },
    actionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: LG.text1,
    },
    actionSubtitle: {
        fontSize: 12,
        color: LG.text3,
        lineHeight: 17,
    },

    // Botão de logout
    logoutBtn: {
        width: '100%',
        height: 54,
        borderRadius: 18,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    logoutText: {
        fontSize: 15,
        color: 'rgba(248,113,113,0.85)',
        fontWeight: '600',
    },
});

// ── Chat Select Screen ─────────────────────────────────────────────
export const chatSelectStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LG.bg,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 22,
        paddingTop: 56,
        paddingBottom: 40,
    },

    orb1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(74,222,128,0.07)',
        top: -60,
        right: -80,
    },
    orb2: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(34,211,238,0.05)',
        bottom: 80,
        left: -60,
    },

    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    backText: {
        fontSize: 18,
        color: LG.green,
        fontWeight: '600',
    },

    headerSection: {
        marginBottom: 32,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        color: LG.green,
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: LG.text1,
        letterSpacing: -1,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: LG.text3,
        lineHeight: 22,
    },

    cards: {
        gap: 14,
        marginBottom: 32,
    },

    // Card de categoria — Liquid Glass pill grande
    categoryCard: {
        borderRadius: 28,
        ...liquidGlass,
        padding: 22,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        overflow: 'hidden',
    },

    // Faixa de cor no lado esquerdo do card
    cardAccentBar: {
        position: 'absolute',
        left: 0,
        top: 16,
        bottom: 16,
        width: 3,
        borderRadius: 2,
        backgroundColor: LG.green,
        opacity: 0.7,
    },

    // Ícone em cápsula Liquid Glass
    iconCapsule: {
        width: 60,
        height: 60,
        borderRadius: 20,
        ...liquidGlassGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconEmoji: { fontSize: 28 },

    cardText: { flex: 1 },
    cardName: {
        fontSize: 18,
        fontWeight: '700',
        color: LG.green,
        marginBottom: 4,
        letterSpacing: 0.1,
    },
    cardDesc: {
        fontSize: 13,
        color: LG.text3,
        lineHeight: 18,
    },

    // Seta
    arrow: {
        width: 32,
        height: 32,
        borderRadius: 10,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        fontSize: 16,
        color: LG.green,
        fontWeight: '600',
    },
});

// ── About Screen ───────────────────────────────────────────────────
export const aboutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LG.bg,
    },
    content: {
        padding: 22,
        paddingTop: 56,
        paddingBottom: 48,
    },

    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        ...liquidGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    backText: {
        fontSize: 18,
        color: LG.green,
    },

    pageTitle: {
        fontSize: 34,
        fontWeight: '800',
        color: LG.text1,
        letterSpacing: -1,
        marginBottom: 28,
    },

    section: {
        borderRadius: 24,
        ...liquidGlass,
        padding: 20,
        marginBottom: 14,
        overflow: 'hidden',
    },
    sectionAccent: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        backgroundColor: LG.borderTop,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: LG.green,
        marginBottom: 10,
        letterSpacing: 0.1,
    },
    text: {
        fontSize: 15,
        color: LG.text2,
        lineHeight: 23,
    },
    listItem: {
        fontSize: 14,
        color: LG.text2,
        lineHeight: 26,
        marginLeft: 2,
    },
    developerName: {
        fontSize: 17,
        fontWeight: '700',
        color: LG.text1,
        marginBottom: 4,
    },
    version: {
        fontSize: 13,
        color: LG.green,
        marginTop: 6,
    },

    // Chips de inspiração
    inspoRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
        flexWrap: 'wrap',
    },
    inspoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 14,
        ...liquidGlass,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderColor: LG.border2,
    },
    inspoChipDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    inspoChipText: {
        fontSize: 14,
        fontWeight: '600',
        color: LG.text1,
    },
    inspoChipSub: {
        fontSize: 11,
        color: LG.text3,
    },
});
