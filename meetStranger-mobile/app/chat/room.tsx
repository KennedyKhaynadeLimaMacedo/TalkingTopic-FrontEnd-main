import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from '../../design-system/components/ChatMessage';
import { colors } from '../../constants/colors';

const categories = [
    { id: 'movies', name: 'Filmes', icon: '🎬' },
    { id: 'games', name: 'Jogos', icon: '🎮' },
    { id: 'series', name: 'Séries', icon: '📺' }
];

export default function ChatRoom() {
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category: string }>();
    const categoryInfo = categories.find(cat => cat.id === category);

    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList | null>(null);
    const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } =
        useChat(category || 'movies');

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 50);
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
        sendMessage(inputText);
        setInputText('');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -85 : 0}
        >
            <View>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>Sair</Text>
                </TouchableOpacity>

                <View>
                    <Text>
                        {categoryInfo?.icon} {categoryInfo?.name}
                    </Text>
                    <Text>
                        {isConnected
                            ? `Conectado com ${partnerName}`
                            : isMatching
                            ? 'Aguardando parceiro...'
                            : ''}
                    </Text>
                </View>

                <TouchableOpacity onPress={findNewPartner}>
                    <Text style={{ color: colors.primary }}>Encontrar novo parceiro</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ChatMessage message={item} />}
                showsVerticalScrollIndicator={false}
            />

            <View>
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={colors.secondary}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={!isConnected || inputText.trim() === ''}
                >
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
