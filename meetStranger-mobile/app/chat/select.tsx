import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Button } from '../../components/button';
import { useRouter } from 'expo-router';
// Importação correta:
import { chatSelectStyles as styles } from '../../styles/screens/chatSelectStyles';

const category = [
    { id: 'Movies', name: 'Filmes', description: 'Converse sobre seus filmes favoritos', icon: '🎬' },
    { id: 'Games', name: 'Jogos', description: 'Converse sobre seus jogos favoritos', icon: '🎮' },
    { id: 'Series', name: 'Séries', description: 'Converse sobre suas séries favoritas', icon: '📺' }
];

export default function Select() {
    const router = useRouter();
    
    const handleCategorySelect = (categoryId: string) => {
        router.push(`/chat/room?category=${categoryId}`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Escolha um Tópico</Text>
                <Text style={styles.subtitle}>Selecione o assunto para conversar</Text>        
            </View>

            {/* Centro (Lista) */}
            <View style={styles.categoryContainer}>
                {category.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={styles.categoryCard}
                        onPress={() => handleCategorySelect(cat.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.icon}>{cat.icon}</Text>
                        <Text style={styles.name}>{cat.name}</Text>
                        <Text style={styles.description}>{cat.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
                <Button
                    title="Voltar"
                    onPress={() => router.back()}
                    variant='primary'
                />
            </View>
        </ScrollView>
    );
}