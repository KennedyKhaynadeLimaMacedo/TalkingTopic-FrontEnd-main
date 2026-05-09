import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { homeStyles as styles } from '../../styles/liquidGlass';

export default function Home() {
    const router = useRouter();
    const user = { username: 'Kennedy' };

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, []);

    const actions = [
        { icon: '💬', title: 'Conversar',   subtitle: 'Encontre alguém agora',    onPress: () => router.push('/chat/select'), primary: true  },
        { icon: 'ℹ️', title: 'Sobre',       subtitle: 'Conheça o Talking-X',       onPress: () => router.push('/about'),       primary: false },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.orb1} />
            <View style={styles.orb2} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.greeting}>
                            <Text style={styles.greetingSmall}>Bem-vindo de volta 👋</Text>
                            <Text style={styles.greetingName}>{user.username}</Text>
                        </View>
                        <View style={styles.avatarRing}>
                            <Text style={styles.avatarEmoji}>😎</Text>
                        </View>
                    </View>

                    {/* Hero card */}
                    <View style={styles.heroCard}>
                        <View style={styles.heroCardAccent} />
                        <View style={styles.heroLogoRow}>
                            <View style={styles.heroLogo}>
                                <Image source={require('../../assets/TalkingLogo.png')} style={styles.heroLogoImg} resizeMode="contain" />
                            </View>
                            <View>
                                <Text style={styles.heroAppName}>Talking-X</Text>
                                <Text style={styles.heroTagline}>Chat anônimo por tópicos</Text>
                            </View>
                        </View>
                        <Text style={styles.heroDesc}>
                            Conecte-se com desconhecidos que compartilham seus interesses. Filmes, jogos, séries — escolha e converse!
                        </Text>
                        <View style={styles.statsRow}>
                            {[
                                { icon: '🎬', label: 'Filmes' },
                                { icon: '🎮', label: 'Jogos'  },
                                { icon: '📺', label: 'Séries' },
                            ].map(s => (
                                <View key={s.label} style={styles.statPill}>
                                    <Text style={styles.statIcon}>{s.icon}</Text>
                                    <Text style={styles.statLabel}>{s.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Ações */}
                    <Text style={styles.sectionLabel}>AÇÕES RÁPIDAS</Text>
                    <View style={styles.actionsGrid}>
                        {actions.map(action => (
                            <TouchableOpacity
                                key={action.title}
                                style={[styles.actionCard, action.primary && styles.actionCardPrimary]}
                                onPress={action.onPress}
                                activeOpacity={0.75}
                            >
                                <View style={styles.actionIconWrap}>
                                    <Text style={styles.actionIcon}>{action.icon}</Text>
                                </View>
                                <Text style={styles.actionTitle}>{action.title}</Text>
                                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Logout */}
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/auth/login')} activeOpacity={0.75}>
                        <Text>🚪</Text>
                        <Text style={styles.logoutText}>Sair da conta</Text>
                    </TouchableOpacity>

                </Animated.View>
            </ScrollView>
        </View>
    );
}
