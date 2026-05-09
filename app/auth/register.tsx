import React, { useState } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView,
    KeyboardAvoidingView, Platform, StatusBar, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles as styles } from '../../styles/liquidGlass';

export default function Register() {
    const router = useRouter();
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused]   = useState<string | null>(null);

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
                    <View style={styles.logoFrame}>
                        <Image source={require('../../assets/TalkingLogo.png')} style={styles.logo} resizeMode="contain" />
                    </View>
                    <Text style={styles.appName}>TALKING-X</Text>
                    <Text style={styles.title}>Criar conta</Text>
                    <Text style={styles.subtitle}>Junte-se à comunidade</Text>

                    <View style={styles.divider} />

                    <View style={styles.inputs}>
                        {[
                            { key: 'name',     label: 'NOME',  value: name,     set: setName,     ph: 'Seu nome',       secure: false, type: 'default' as any },
                            { key: 'email',    label: 'EMAIL', value: email,    set: setEmail,    ph: 'seu@email.com',  secure: false, type: 'email-address' as any },
                            { key: 'password', label: 'SENHA', value: password, set: setPassword, ph: '••••••••',        secure: true,  type: 'default' as any },
                        ].map(field => (
                            <View key={field.key} style={styles.inputWrap}>
                                <Text style={styles.inputLabel}>{field.label}</Text>
                                <TextInput
                                    style={[styles.inputGlass, focused === field.key && styles.inputFocused]}
                                    value={field.value}
                                    onChangeText={field.set}
                                    placeholder={field.ph}
                                    placeholderTextColor="rgba(255,255,255,0.25)"
                                    secureTextEntry={field.secure}
                                    keyboardType={field.type}
                                    autoCapitalize={field.key === 'name' ? 'words' : 'none'}
                                    onFocus={() => setFocused(field.key)}
                                    onBlur={() => setFocused(null)}
                                />
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.btnPrimary}
                        onPress={() => router.replace('/home')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.btnPrimaryText}>CADASTRAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnGhost} onPress={() => router.push('/auth/login')}>
                        <Text style={styles.btnGhostText}>Já tem conta? Faça login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
