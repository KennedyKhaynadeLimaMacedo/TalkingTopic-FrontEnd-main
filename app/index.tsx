import React, { useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { welcomeStyles as styles } from '../styles/liquidGlass';

export default function Welcome() {
    const router = useRouter();

    const fadeAnim  = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const scaleAnim = useRef(new Animated.Value(0.88)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 12, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 12, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.orb1} />
            <View style={styles.orb2} />
            <View style={styles.orb3} />

            <Animated.View style={[styles.heroSection, {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            }]}>
                <View style={styles.logoFrame}>
                    <Image source={require('../assets/TalkingLogo.png')} style={styles.logo} resizeMode="contain" />
                </View>

                <View style={styles.badge}>
                    <View style={styles.badgeDot} />
                    <Text style={styles.badgeText}>ANÔNIMO · SEGURO · GRÁTIS</Text>
                </View>

                <Text style={styles.title}>
                    Talking<Text style={styles.titleAccent}>-X</Text>
                </Text>

                <Text style={styles.subtitle}>
                    Converse com pessoas do mundo todo{'\n'}sobre o que você ama
                </Text>

                <View style={styles.pillRow}>
                    {[{ icon:'🎬', label:'Filmes' }, { icon:'🎮', label:'Jogos' }, { icon:'📺', label:'Séries' }].map(item => (
                        <View key={item.label} style={styles.pill}>
                            <Text style={styles.pillIcon}>{item.icon}</Text>
                            <Text style={styles.pillText}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </Animated.View>

            <Animated.View style={[styles.buttonGroup, { opacity: fadeAnim }]}>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/auth/login')} activeOpacity={0.8}>
                    <Text style={styles.btnPrimaryText}>Entrar na Conversa →</Text>
                </TouchableOpacity>
                <Text style={styles.helpText}>Novo por aqui?</Text>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/auth/register')} activeOpacity={0.8}>
                    <Text style={styles.btnSecondaryText}>Criar Conta</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}
