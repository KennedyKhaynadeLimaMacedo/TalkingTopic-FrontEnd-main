import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, FlatList,
    TouchableOpacity, SafeAreaView, StatusBar, Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from '../../design-system/components/ChatMessage';
import { styles } from '../../styles/screens/chatRoomStyles';

const categories = [
    { id: 'movies', name: 'Filmes', icon: '🎬' },
    { id: 'games',  name: 'Jogos',  icon: '🎮' },
    { id: 'series', name: 'Séries', icon: '📺' },
];

export default function Room() {
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category?: string }>();
    const selectedCategory = (category as string) || 'movies';
    const categoryInfo = categories.find(c => c.id === selectedCategory.toLowerCase()) || categories[0];

    const flatListRef = useRef<FlatList>(null);

    const { messages, isConnected, isMatching, partnerName, findNewPartner } =
        useChat(selectedCategory);

    // Animação pulsante enquanto procura
    const pulseAnim = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        if (!isMatching) { pulseAnim.setValue(1); return; }
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.18, duration: 700, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [isMatching]);

    // Scroll automático
    useEffect(() => {
        if (messages.length > 0)
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, [messages]);

    const statusDot   = isConnected ? '●' : isMatching ? '◌' : '○';
    const statusColor = isConnected ? '#4ADE80' : isMatching ? '#FBBF24' : '#6B7280';
    const statusText  = isConnected
        ? `Com ${partnerName}`
        : isMatching ? 'Procurando parceiro...' : 'Offline';

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />

            <View style={[styles.glowBall, { top: '8%',  left: '-12%', backgroundColor: '#4ADE8020' }]} />
            <View style={[styles.glowBall, { bottom: '18%', right: '-12%', backgroundColor: '#22d3ee18' }]} />

            <View style={styles.container}>
                {/* ── Header ── */}
                <View style={styles.headerGlass}>
                    <TouchableOpacity style={styles.navButtonGlass} onPress={() => router.back()}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: statusColor, fontSize: 10 }}>{statusDot}</Text>
                            <Text style={styles.headerStatus}>{statusText}</Text>
                        </View>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.headerCategoryText}>
                                {categoryInfo.icon} {categoryInfo.name}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.navButtonGlass} onPress={findNewPartner}>
                        <Text style={styles.navButtonText}>↻</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Mensagens ── */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ChatMessage message={item} />}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        isMatching ? (
                            <View style={styles.matchingContainer}>
                                <Animated.View style={[styles.matchingOrb, { transform: [{ scale: pulseAnim }] }]} />
                                <Text style={styles.matchingEmoji}>🔍</Text>
                                <Text style={styles.matchingTitle}>Procurando parceiro</Text>
                                <Text style={styles.matchingSubtitle}>
                                    Abra outra aba do navegador{'\n'}na mesma categoria para conectar
                                </Text>
                                <View style={styles.matchingDots}>
                                    <MatchDot delay={0} />
                                    <MatchDot delay={200} />
                                    <MatchDot delay={400} />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.emptyGlass}>
                                <Text style={{ fontSize: 26, marginBottom: 8 }}>👋</Text>
                                <Text style={styles.emptyText}>
                                    Anonimato total garantido{'\n'}Diga olá para começar!
                                </Text>
                            </View>
                        )
                    }
                />

            </View>
        </SafeAreaView>
    );
}

function MatchDot({ delay }: { delay: number }) {
    const anim = useRef(new Animated.Value(0.3)).current;
    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(anim, { toValue: 1,   duration: 400, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);
    return (
        <Animated.View style={{
            width: 8, height: 8, borderRadius: 4,
            backgroundColor: '#4ADE80', opacity: anim, marginHorizontal: 3,
        }} />
    );
}
