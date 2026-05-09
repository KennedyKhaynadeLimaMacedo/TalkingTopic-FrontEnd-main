import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, TextInput, FlatList,
    KeyboardAvoidingView, Platform, TouchableOpacity,
    SafeAreaView, StatusBar, Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from '../../design-system/components/ChatMessage';
import { styles } from '../../styles/screens/chatRoomStyles';

const categories = [
    { id: 'movies', name: 'Filmes', icon: '🎬' },
    { id: 'games', name: 'Jogos', icon: '🎮' },
    { id: 'series', name: 'Séries', icon: '📺' },
];

export default function Room() {
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category?: string }>();
    const selectedCategory = category || 'movies';
    const categoryInfo = categories.find((cat) => cat.id === selectedCategory) || categories[0];

    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const focusAnim = useRef(new Animated.Value(0)).current;

    const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } = useChat(selectedCategory);

    // Animação de foco no input
    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused]);

    // Scroll automático ao receber mensagem
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;
        await sendMessage(inputText.trim());
        setInputText('');
    };

    // Cor de borda animada quando o input está focado
    const borderColor = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.18)', 'rgba(74, 222, 128, 0.5)'],
    });
    const shadowOpacity = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.08, 0.25],
    });

    // Indicador de status
    const statusColor = isConnected ? '#4ADE80' : isMatching ? '#FBBF24' : '#6B7280';
    const statusDot = isConnected ? '●' : isMatching ? '◌' : '○';

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />

            {/* Bolas de glow decorativas */}
            <View style={[styles.glowBall, { top: '8%', left: '-12%', backgroundColor: '#4ADE8020' }]} />
            <View style={[styles.glowBall, { bottom: '18%', right: '-12%', backgroundColor: '#22d3ee18' }]} />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                {/* ── Header glassmorfismo ── */}
                <View style={styles.headerGlass}>
                    <TouchableOpacity style={styles.navButtonGlass} onPress={() => router.back()}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ color: statusColor, fontSize: 10 }}>{statusDot}</Text>
                            <Text style={styles.headerStatus}>
                                {isConnected ? `Com ${partnerName}` : isMatching ? 'Procurando...' : 'Offline'}
                            </Text>
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

                {/* ── Lista de mensagens ── */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ChatMessage message={item} />}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyGlass}>
                            <Text style={{ fontSize: 28, marginBottom: 10 }}>👋</Text>
                            <Text style={styles.emptyText}>
                                Anonimato total garantido{'\n'}Seja respeitoso com todos
                            </Text>
                        </View>
                    }
                />

                {/* ── Área de input com glassmorfismo ── */}
                <View style={styles.inputAreaGlass}>
                    <Animated.View
                        style={[
                            styles.inputWrapperGlass,
                            {
                                borderColor,
                                shadowOpacity,
                            },
                        ]}
                    >
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            onSubmitEditing={handleSendMessage}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            blurOnSubmit={false}
                            multiline
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                !inputText.trim() && styles.sendButtonDisabled,
                            ]}
                            onPress={handleSendMessage}
                            disabled={!inputText.trim()}
                            activeOpacity={0.75}
                        >
                            <Text style={[
                                styles.sendButtonText,
                                !inputText.trim() && styles.sendButtonTextDisabled,
                            ]}>
                                ▶
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
