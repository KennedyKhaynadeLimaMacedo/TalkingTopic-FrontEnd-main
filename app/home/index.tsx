import { Text, View, Image } from 'react-native';
import { Button } from '../../components/button';
import { useRouter } from 'expo-router';
import React from 'react';
import { homeStyles as styles } from '../../styles/screens/homeStyles';

export default function Home() {
    const router = useRouter();
    const user = { username: 'Kennedy' };

    const handleStartChat = () => {
        router.push('/chat/select');
    };
    const handleAbout = () => {
        router.push('/about');
    };
    const handleLogout = async () => {
        router.replace('/auth/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/TalkingLogo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.welcome}>
                        Bem-vindo, {user?.username || 'Stranger'}
                    </Text>
                    <Text style={styles.subtitle}>
                        Pronto para se conectar com novas pessoas?
                    </Text>
                </View>

                {/* Card central */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>MeetStranger</Text>
                    <Text style={styles.cardDescription}>
                        Converse com pessoas ao redor do mundo e encontre quem compartilha seus interesses!
                    </Text>
                    <View style={styles.featureRow}>
                        <View style={styles.feature}>
                            <Text style={styles.featureIcon}>🌍</Text>
                            <Text style={styles.featureText}>Explore o mundo</Text>
                        </View>
                        <View style={styles.feature}>
                            <Text style={styles.featureIcon}>⚡</Text>
                            <Text style={styles.featureText}>Rápido e fácil</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Botões */}
            <View style={styles.buttons}>
                <Button
                    title="Começar a Conversar"
                    onPress={handleStartChat}
                    variant="primary"
                    fullWidth
                />
                <Button
                    title="Conheça mais sobre o app"
                    onPress={handleAbout}
                    variant="outline"
                    fullWidth
                />
                <Button
                    title="Sair"
                    onPress={handleLogout}
                    variant="secondary"
                    fullWidth
                />
            </View>
        </View>
    );
}
