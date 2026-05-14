import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({

    // ── Layout base
    safe: {
        flex: 1,
        backgroundColor: '#0D1117',
    },
    container: {
        flex: 1,
    },

    // ── Bolas de brilho decorativas
    glowBall: {
        position: 'absolute',
        width: width * 0.65,
        height: width * 0.65,
        borderRadius: width * 0.325,
        zIndex: 0,
    },

    // ── Header (glass)
    headerGlass: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.10)',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    headerStatus: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.55)',
        fontWeight: '500',
    },
    categoryBadge: {
        backgroundColor: 'rgba(74,222,128,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(74,222,128,0.25)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    headerCategoryText: {
        color: '#4ADE80',
        fontSize: 13,
        fontWeight: '600',
    },

    // ── Botões de navegação (glass)
    navButtonGlass: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        color: 'rgba(255,255,255,0.80)',
        fontSize: 18,
        fontWeight: '600',
    },

    // ── Lista de mensagens
    messagesList: {
        paddingVertical: 12,
        flexGrow: 1,
    },

    // ── Estado vazio (sem parceiro ainda)
    emptyGlass: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyText: {
        color: 'rgba(255,255,255,0.35)',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },

    // ── Estado de busca de parceiro
    matchingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    matchingOrb: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(74,222,128,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(74,222,128,0.20)',
    },
    matchingEmoji: {
        fontSize: 36,
        marginBottom: 16,
    },
    matchingTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 8,
    },
    matchingSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.38)',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    matchingDots: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // ── Área de input
    inputAreaGlass: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
    },
    inputWrapperGlass: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1.5,
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 6,
        gap: 8,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        paddingVertical: 6,
        maxHeight: 100,
    },

    // ── Botão enviar
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#4ADE80',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: 'rgba(74,222,128,0.20)',
    },
    sendButtonText: {
        color: '#0D1117',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 2,
    },
});
