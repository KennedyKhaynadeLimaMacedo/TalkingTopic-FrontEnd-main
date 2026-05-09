import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { chatSelectStyles as styles } from '../../styles/liquidGlass';

const categories = [
    { id: 'Movies', name: 'Filmes', description: 'Discuta lançamentos, clássicos e recomendações', icon: '🎬' },
    { id: 'Games',  name: 'Jogos',  description: 'Fale sobre games, conquistas e dicas',            icon: '🎮' },
    { id: 'Series', name: 'Séries', description: 'Comente episódios, spoilers e favoritas',          icon: '📺' },
];

export default function Select() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.orb1} />
            <View style={styles.orb2} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    {/* Botão voltar — vai para /home em vez de back() */}
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/home')}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerSection}>
                        <Text style={styles.eyebrow}>TALKING-X</Text>
                        <Text style={styles.title}>Escolha{'\n'}um tópico</Text>
                        <Text style={styles.subtitle}>
                            Selecione um assunto e encontre{'\n'}alguém para conversar agora
                        </Text>
                    </View>

                    <View style={styles.cards}>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryCard}
                                onPress={() => router.push(`/chat/room?category=${cat.id}`)}
                                activeOpacity={0.75}
                            >
                                <View style={styles.cardAccentBar} />
                                <View style={styles.iconCapsule}>
                                    <Text style={styles.iconEmoji}>{cat.icon}</Text>
                                </View>
                                <View style={styles.cardText}>
                                    <Text style={styles.cardName}>{cat.name}</Text>
                                    <Text style={styles.cardDesc}>{cat.description}</Text>
                                </View>
                                <View style={styles.arrow}>
                                    <Text style={styles.arrowText}>›</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
