import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

export function ChatMessage({ message }: { message: any }) {
    if (!message || !message.text) return null;

    // Suporta tanto message.sender ('me'|'partner'|'system')
    // quanto o legado message.isUser (boolean)
    const isMe   = message.sender === 'me'     || message.isUser === true;
    const isSystem = message.sender === 'system';

    // ── Animações de entrada ──────────────────────────────────────
    const fadeAnim  = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(isMe ? 24 : -24)).current;
    const scaleAnim = useRef(new Animated.Value(0.94)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const username  = message.UserName || (isMe ? 'Você' : 'Anônimo');
    const timestamp = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // ── Mensagem de sistema ───────────────────────────────────────
    if (isSystem) {
        return (
            <Animated.View style={[styles.systemRow, { opacity: fadeAnim }]}>
                <View style={styles.systemBubble}>
                    <Text style={styles.systemText}>{message.text}</Text>
                </View>
            </Animated.View>
        );
    }

    // ── Bolha normal ──────────────────────────────────────────────
    return (
        <Animated.View
            style={[
                styles.row,
                isMe ? styles.rowRight : styles.rowLeft,
                {
                    opacity: fadeAnim,
                    transform: [
                        { translateX: slideAnim },
                        { scale: scaleAnim },
                    ],
                },
            ]}
        >
            {/* Avatar do parceiro */}
            {!isMe && (
                <View style={styles.avatar}>
                    <Text style={styles.avatarEmoji}>👤</Text>
                </View>
            )}

            <View style={[styles.bubbleCol, isMe ? styles.bubbleColRight : styles.bubbleColLeft]}>

                {/* Nome (só parceiro) */}
                {!isMe && (
                    <Text style={styles.username}>{username}</Text>
                )}

                {/* ── Bolha de vidro ── */}
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubblePartner]}>

                    {/* Linha de brilho no topo — efeito vidro */}
                    <View style={[styles.shine, isMe ? styles.shineMy : styles.shinePartner]} />

                    <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextPartner]}>
                        {message.text}
                    </Text>

                    {/* Rodapé: hora + ✓✓ */}
                    <View style={[styles.footer, isMe ? styles.footerRight : styles.footerLeft]}>
                        <Text style={[styles.time, isMe ? styles.timeMe : styles.timePartner]}>
                            {timestamp}
                        </Text>
                        {isMe && <Text style={styles.check}>✓✓</Text>}
                    </View>
                </View>
            </View>

            {/* Espaçador no lado direito para simetria */}
            {isMe && <View style={styles.avatarSpacer} />}
        </Animated.View>
    );
}

// ── Estilos ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({

    // Linha
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 4,
        paddingHorizontal: 10,
    },
    rowRight: { justifyContent: 'flex-end' },
    rowLeft:  { justifyContent: 'flex-start', gap: 8 },

    // Avatar parceiro
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        flexShrink: 0,
    },
    avatarEmoji: { fontSize: 13 },
    avatarSpacer: { width: 30, flexShrink: 0, marginLeft: 8 },

    // Coluna da bolha
    bubbleCol: { maxWidth: '75%' },
    bubbleColRight: { alignItems: 'flex-end' },
    bubbleColLeft:  { alignItems: 'flex-start' },

    // Nome
    username: {
        fontSize: 11,
        color: 'rgba(74,222,128,0.65)',
        fontWeight: '600',
        marginBottom: 3,
        marginLeft: 12,
        letterSpacing: 0.3,
    },

    // Bolha base
    bubble: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 20,
        overflow: 'hidden',
    },

    // ── MINHA bolha (verde translúcido) ──
    bubbleMe: {
        backgroundColor: 'rgba(74,222,128,0.16)',
        borderWidth: 1,
        borderColor: 'rgba(74,222,128,0.30)',
        borderTopColor: 'rgba(74,222,128,0.50)',   // brilho no topo
        borderBottomRightRadius: 4,
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    },

    // ── Bolha do PARCEIRO (branco translúcido) ──
    bubblePartner: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        borderTopColor: 'rgba(255,255,255,0.22)',  // brilho no topo
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },

    // Linha de brilho interna (efeito vidro real)
    shine: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        height: 1,
        borderRadius: 1,
    },
    shineMy:      { backgroundColor: 'rgba(74,222,128,0.50)' },
    shinePartner: { backgroundColor: 'rgba(255,255,255,0.20)' },

    // Texto
    msgText: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '400',
        letterSpacing: 0.1,
    },
    msgTextMe:      { color: '#E8FFF3' },
    msgTextPartner: { color: 'rgba(255,255,255,0.88)' },

    // Rodapé (hora + check)
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 3,
    },
    footerRight: { justifyContent: 'flex-end' },
    footerLeft:  { justifyContent: 'flex-start' },
    time: { fontSize: 10, fontWeight: '500' },
    timeMe:      { color: 'rgba(74,222,128,0.55)' },
    timePartner: { color: 'rgba(255,255,255,0.30)' },
    check: { fontSize: 10, color: 'rgba(74,222,128,0.65)' },

    // Mensagem de sistema (aviso central)
    systemRow: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    systemBubble: {
        backgroundColor: 'rgba(251,191,36,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(251,191,36,0.25)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 7,
        maxWidth: '80%',
    },
    systemText: {
        fontSize: 12,
        color: 'rgba(251,191,36,0.85)',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
