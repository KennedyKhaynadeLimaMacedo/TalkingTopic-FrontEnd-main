import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
// Se quiser o desfoque real no iOS/Android, instale: npx expo install expo-blur
// import { BlurView } from 'expo-blur'; 

import { useChat } from '../../hooks/useChat';
import { ChatMessage as ChatMessageComponent } from '../../design-system/components/ChatMessage';

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
    const flatListRef = useRef<FlatList<any>>(null);

    const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } = useChat(selectedCategory);

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;
        await sendMessage(inputText);
        setInputText('');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />
            
            {/* Elementos de Brilho ao Fundo para o Glassmorfismo aparecer */}
            <View style={[styles.glowBall, { top: '10%', left: '-10%', backgroundColor: '#4ADE8022' }]} />
            <View style={[styles.glowBall, { bottom: '20%', right: '-10%', backgroundColor: '#22d3ee22' }]} />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* HEADER GLASS */}
                <View style={styles.headerGlass}>
                    <TouchableOpacity style={styles.navButtonGlass} onPress={() => router.back()}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerStatus}>
                            {isConnected ? `Conectado com ${partnerName}` : isMatching ? 'Procurando...' : 'Desconectado'}
                        </Text>
                        <View style={styles.categoryBadge}>
                           <Text style={styles.headerCategoryText}>{categoryInfo.icon} {categoryInfo.name}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.navButtonGlass} onPress={findNewPartner}>
                        <Text style={styles.navButtonText}>→</Text>
                    </TouchableOpacity>
                </View>

                {/* MENSAGENS */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ChatMessageComponent message={item} />}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyGlass}>
                            <Text style={styles.emptyText}>
                                Lembre-se, no TalkingTopic, seu anonimato é total!
                            </Text>
                        </View>
                    }
                />

                {/* INPUT AREA GLASS */}
                <View style={styles.inputAreaGlass}>
                    <View style={styles.inputWrapperGlass}>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            multiline
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                (!isConnected || !inputText.trim()) && styles.sendButtonDisabled,
                            ]}
                            onPress={handleSendMessage}
                            disabled={!isConnected || !inputText.trim()}
                        >
                            <Text style={styles.sendButtonText}>▶</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#030712', // Fundo bem escuro para o contraste do vidro
    },
    container: {
        flex: 1,
    },
    glowBall: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.6,
    },
    headerGlass: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Transparência branca
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Borda reflexiva
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    navButtonGlass: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        color: '#4ADE80',
        fontSize: 20,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerStatus: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    categoryBadge: {
        marginTop: 4,
        backgroundColor: 'rgba(74, 222, 128, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.3)',
    },
    headerCategoryText: {
        color: '#4ADE80',
        fontSize: 11,
        fontWeight: '600',
    },
    messagesList: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexGrow: 1,
    },
    emptyGlass: {
        alignSelf: 'center',
        marginTop: 40,
        padding: 20,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        maxWidth: '80%',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },
    inputAreaGlass: {
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 10 : 20,
        paddingTop: 10,
    },
    inputWrapperGlass: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        padding: 6,
        gap: 8,
    },
    input: {
        flex: 1,
        minHeight: 45,
        maxHeight: 100,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        color: '#FFFFFF',
        fontSize: 15,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#4ADE80',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    sendButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        shadowOpacity: 0,
    },
    sendButtonText: {
        color: '#050816',
        fontSize: 16,
    },
});