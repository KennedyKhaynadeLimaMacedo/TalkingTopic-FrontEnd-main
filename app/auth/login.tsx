import React, { useState, useRef } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView,
    KeyboardAvoidingView, Platform, StatusBar,
    TextInput, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles as styles } from '../../styles/liquidGlass';

export default function Login() {
    const router = useRouter();
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleLogin = () => router.replace('/chat/select');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar barStyle="light-content" />
            <View style={styles.orb1} />
            <View style={styles.orb2} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Logo */}
                    <View style={styles.logoFrame}>
                        <Image source={require('../../assets/TalkingLogo.png')} style={styles.logo} resizeMode="contain" />
                    </View>
                    <Text style={styles.appName}>TALKING-X</Text>
                    <Text style={styles.title}>Bem-vindo de volta</Text>
                    <Text style={styles.subtitle}>Faça login para continuar</Text>

                    <View style={styles.divider} />

                    <View style={styles.inputs}>
                        {/* Email */}
                        <View style={styles.inputWrap}>
                            <Text style={styles.inputLabel}>EMAIL</Text>
                            <TextInput
                                style={[styles.inputGlass, focusedField === 'email' && styles.inputFocused]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="seu@email.com"
                                placeholderTextColor="rgba(255,255,255,0.25)"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>

                        {/* Senha */}
                        <View style={styles.inputWrap}>
                            <Text style={styles.inputLabel}>SENHA</Text>
                            <TextInput
                                style={[styles.inputGlass, focusedField === 'password' && styles.inputFocused]}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255,255,255,0.25)"
                                secureTextEntry
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} activeOpacity={0.8}>
                        <Text style={styles.btnPrimaryText}>ENTRAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnGhost} onPress={() => router.push('/auth/register')}>
                        <Text style={styles.btnGhostText}>Não tem conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
