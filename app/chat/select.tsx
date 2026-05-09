import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Button } from '../../components/button';
import { useRouter } from 'expo-router';
import { chatSelectStyles as styles } from '../../styles/screens/chatSelectStyles';

const category = [
    { id: 'Movies', name: 'Filmes', description: 'Converse sobre seus filmes favoritos', icon: '🎬' },
    { id: 'Games', name: 'Jogos', description: 'Converse sobre seus jogos favoritos', icon: '🎮' },
    { id: 'Series', name: 'Séries', description: 'Converse sobre suas séries favoritas', icon: '📺' },
];

export default function Select() {
    const router = useRouter();

    const handleCategorySelect = (categoryId: string) => {
        router.push(`/chat/room?category=${categoryId}`);
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Bolas de glow decorativas */}
            <View style={styles.glowBall1} />
            <View style={styles.glowBall2} />

            <View style={styles.innerContainer}>
                {/* ── Cabeçalho ── */}
                <View style={styles.header}>
                    <Text style={styles.eyebrow}>Chat Anônimo</Text>
                    <Text style={styles.title}>Escolha um Tópico</Text>
                    <Text style={styles.subtitle}>Selecione o assunto{'\n'}e encontre alguém para conversar</Text>
                </View>

                {/* ── Cards de categoria com glassmorfismo ── */}
                <View style={styles.categoryContainer}>
                    {category.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={styles.categoryCard}
                            onPress={() => handleCategorySelect(cat.id)}
                            activeOpacity={0.75}
                        >
                            {/* Ícone em bolha de vidro */}
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{cat.icon}</Text>
                            </View>

                            {/* Textos */}
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.name}>{cat.name}</Text>
                                <Text style={styles.description}>{cat.description}</Text>
                            </View>

                            {/* Seta */}
                            <Text style={styles.cardArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Rodapé ── */}
                <View style={styles.footer}>
                    <Button
                        title="Voltar"
                        onPress={() => router.back()}
                        variant='primary'
                    />
                </View>
            </View>
        </ScrollView>
    );
}
